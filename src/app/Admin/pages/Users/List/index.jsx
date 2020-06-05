import React, { Fragment, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Cards, { Card, CardRow, CardTitle, CardContent, CardInfo } from 'components/Cards'
import { ColumnWrapper, ColumnLeft, Title, Container } from 'templates/PageTemplate'
import { usersAsyncRequest, usersUpdatePage, usersUpdateFilters } from 'admin/actions/users'
import Pagination from 'components/Pagination'
import { bindPathParams } from 'helpers'
import UsersSidePanel from 'admin/pages/Users/SidePanel'
import UsersSearchForm from 'admin/components/UsersSearchForm'

const UsersList = ({ parent, profile: { pages: profilePages } }) => {
  const dispatch = useDispatch()
  const users = useSelector(({ admin }) => admin.users.get('results'))
  const options = useSelector(({ admin }) => admin.users.get('options'))
  const pages = useSelector(({ admin }) => admin.users.getTotalPages())
  const selectedPage = options.get('currentPageIndex')
  const history = useHistory()

  const requestUsersList = useCallback(() => {
    dispatch(usersAsyncRequest())
  }, [])

  const onChange = useCallback(() => {
    dispatch(usersUpdateFilters(''))
  }, [])

  useEffect(() => {
    requestUsersList()
  }, [selectedPage])

  const onPageChange = useCallback((page) => async () => {
    dispatch(usersUpdatePage(page))
  }, [])

  const onUserClick = useCallback((user) => () => {
    const route = bindPathParams({
      userId: user.get('id')
    }, profilePages.USERS.VIEW)
    history.push(route)
  }, [])

  return (
    <Fragment>
      <UsersSidePanel
        pages={profilePages.USERS}
        routes={parent.routes}
        onChange={onChange}
      />
      <UsersSearchForm requestUsersList={requestUsersList} />
      <ColumnWrapper>
        <ColumnLeft>
          <Title>Lista de usuários</Title>
        </ColumnLeft>
      </ColumnWrapper>
      <Container>
        { users.size > 0 ? (
          <Cards>
            { users.map((user) => {
              return (
                <Card
                  key={user.get('id')}
                  onClick={onUserClick(user)}
                >
                  <CardRow>
                    <CardTitle isAvatarVisible={true}>
                      { user.getFullName() }
                    </CardTitle>
                  </CardRow>
                  <CardContent>
                    <CardInfo title='Representante'>
                      { user.get('isSeller') ? 'Sim' : 'Não' }
                    </CardInfo>
                    <CardInfo title='Administrador'>
                      { user.get('isAdmin') ? 'Sim' : 'Não' }
                    </CardInfo>
                  </CardContent>
                </Card>
              )
            }) }
          </Cards>
        ) : (
          <div>
            Sem resultados
          </div>
        )}
      </Container>
      <ColumnWrapper>
        <ColumnLeft>
          <Pagination
            pages={pages}
            selectedPage={selectedPage}
            onChange={onPageChange}
          />
        </ColumnLeft>
      </ColumnWrapper>
    </Fragment>
  )
}

UsersList.propTypes = {
  profile: PropTypes.object.isRequired,
  parent: PropTypes.object.isRequired
}

export default React.memo(UsersList)
