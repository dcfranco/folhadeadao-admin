import React, { Fragment, useEffect, useContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { ColumnWrapper, ColumnLeft, ColumnRight, Container } from 'templates/PageTemplate'
import ViewTable, { ViewTableRow, ViewTableCell } from 'components/ViewTable'
import { ToastContext } from 'components/ToastProvider'
import { usersAsyncRequest, userAsyncRequest, userResetSelected } from 'admin/actions/users'
import UserInfo from 'components/UserInfo'
import Button from 'components/Button'
import { bindPathParams } from 'helpers'

import UserViewSidePanel from './SidePanel'


const UsersView = ({ profile: { pages } }) => {
  const { showErrorToast } = useContext(ToastContext)
  const { userId } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(({ admin }) => admin.users.getIn(['options', 'selected']))
  const users = useSelector(({ admin }) => admin.users.get('results'))

  const userNotFound = () => {
    showErrorToast({
      message: 'Usuário não encontrado!'
    })
    history.push(pages.USERS.INDEX)
  }

  useEffect(() => () => dispatch(userResetSelected()), [])

  useEffect(() => {
    if (!userId) {
      userNotFound()
    } else {
      dispatch(userAsyncRequest(userId)).then((response) => {
        if (!response) {
          userNotFound()
        } else if (users.size === 0) {
          dispatch(usersAsyncRequest())
        }
      })
    }
  }, [userId])

  const onUserEditClick = useCallback(() => {
    const route = bindPathParams({
      userId: user.get('id')
    }, pages.USERS.EDIT)
    history.push(route)
  }, [user])

  if (!user) {
    return null
  }

  const fullname = user.getFullName()
  const hasAccess = !user.get('isBlocked')
  const isAdmin = user.get('isAdmin')
  const isSeller = user.get('isSeller')

  return (
    <Fragment>
      <UserViewSidePanel />
      <ColumnWrapper className='mb-2 mt-4'>
        <ColumnLeft>
          <div className='d-flex align-items-center h-100'>
            <div
              className={classNames('px-3 py-1 text-white text-center rounded', {
                'bg-danger': !hasAccess,
                'bg-success': hasAccess
              })}
            >
              { hasAccess ? 'Desbloqueado' : 'Bloqueado' }
            </div>
            { isAdmin && (
              <div
                className={classNames('ml-3 px-3 py-1 text-white text-center rounded bg-success')}
              >
                Administrador
              </div>
            )}
          </div>
        </ColumnLeft>
        <ColumnRight isActionBar={true}>
          <Button type='button' className='btn btn-default' onClick={onUserEditClick}>
            Editar
          </Button>
        </ColumnRight>
      </ColumnWrapper>

      <ColumnWrapper className='mt-0 mb-4 d-flex flex-column flex-md-row'>
        <ColumnLeft>
          <UserInfo
            className='font-size-xl'
            avatarClassName='text-dark border-dark'
            infoClassName='text-low-dark'
            fullName={fullname}
          >
            { `CPF: ${user.get('cpf')}` }
          </UserInfo>
        </ColumnLeft>
      </ColumnWrapper>
      <Container isWhiteBackground={true}>
        <ViewTable title='Informações Pessoais'>
          <ViewTableRow>
            <ViewTableCell className='w-md-50' label='Nome' value={fullname} />
            <ViewTableCell className='w-md-25' label='Último login' value={user.getFormatedDate('lastLogin')} />
            <ViewTableCell className='w-md-25' label='É representante?' value={isSeller ? 'Sim' : 'Não'} />
          </ViewTableRow>
          <ViewTableRow>
            <ViewTableCell className='w-md-33' label='Data de nascimento' value={user.getFormatedDate('birthday')} />
            <ViewTableCell className='w-md-33' label='Sexo' value={user.getGenre()} />
            <ViewTableCell className='w-md-33' label='CPF' value={user.get('cpf')} />
          </ViewTableRow>
          <ViewTableRow>
            <ViewTableCell className='w-md-75' label='E-mail' value={user.get('email')} />
            <ViewTableCell className='w-md-25' label='Usuário' value={user.get('username')} />
          </ViewTableRow>
        </ViewTable>
      </Container>
    </Fragment>
  )
}

UsersView.propTypes = {
  profile: PropTypes.object.isRequired
}

export default React.memo(UsersView)
