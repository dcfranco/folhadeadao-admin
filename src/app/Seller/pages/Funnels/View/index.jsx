import React, { Fragment, useEffect, useContext, useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { ColumnWrapper, ColumnLeft, ColumnRight, Container } from 'templates/PageTemplate'
import ViewTable, { ViewTableRow, ViewTableCell } from 'components/ViewTable'
import { ToastContext } from 'components/ToastProvider'
import { customerDeleteRequest } from 'seller/actions/customers'
import { funnelsAsyncRequest, funnelAsyncRequest, funnelResetSelected, funnelDeleteRequest } from 'seller/actions/funnels'
import UserInfo from 'components/UserInfo'
import Button from 'components/Button'
import { bindPathParams } from 'helpers'
import CreateGenericConfirmModal from 'components/GenericConfirmModal'

import FunnelViewSidePanel from './SidePanel'
import { total } from '../List'

const ConfirmDeleteModal = CreateGenericConfirmModal({
  confirmBtnClassName: 'btn-danger',
  cancelOnClose: true
})

const FunnelsView = ({ profile: { pages } }) => {
  const { showSuccessToast, showErrorToast } = useContext(ToastContext)
  const [isDeleteModalOpen, toggleDeleteModal] = useState(false)
  const { funnelId } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const funnel = useSelector(({ seller }) => seller.funnels.getIn(['options', 'selected']))
  const funnels = useSelector(({ seller }) => seller.funnels.get('results'))
  const sellerId = useSelector((state) => state.user.getIn(['data', 'seller', 'id']))

  const funnelNotFound = () => {
    showErrorToast({
      message: 'Cadastro não encontrado!'
    })
    history.push(pages.FUNNELS.INDEX)
  }

  useEffect(() => () => dispatch(funnelResetSelected()), [])

  useEffect(() => {
    if (!funnelId) {
      funnelNotFound()
    } else {
      dispatch(funnelAsyncRequest(funnelId)).then((response) => {
        if (!response) {
          funnelNotFound()
        } else if (funnels.size === 0) {
          dispatch(funnelsAsyncRequest(sellerId))
        }
      })
    }
  }, [funnelId])

  const onDeleteConfirm = useCallback(async () => {
    toggleDeleteModal(false)
    const response = await dispatch(funnelDeleteRequest(funnel.get('id')))
    if (response) {
      await dispatch(customerDeleteRequest(funnel.getIn(['customer', 'id'])))
      showSuccessToast({
        message: 'Acesso removido com sucesso!'
      })
      await dispatch(funnelsAsyncRequest())
      history.push(pages.FUNNELS.INDEX)
    } else {
      showErrorToast({
        message: 'Ocorreu um problema, tente novamente mais tarde'
      })
    }
  }, [funnel, funnelId])

  const onDeleteClose = useCallback(() => {
    toggleDeleteModal(false)
  }, [])

  const onFunnelDeleteClick = useCallback(() => {
    toggleDeleteModal(true)
  }, [funnel])

  const onFunnelEditClick = useCallback(() => {
    const route = bindPathParams({
      funnelId: funnel.get('id')
    }, pages.FUNNELS.EDIT)
    history.push(route)
  }, [funnel])

  if (!funnel) {
    return null
  }

  const customer = funnel.get('customer')
  const fullname = customer.getFullName()
  const hasAccess = funnel.get('funnelAnswers').size > 0
  const hasFinished = parseInt(funnel.get('currentQuestion'), 10) >= total
  const completed = (parseInt(funnel.get('currentQuestion'), 10) * 100) / total

  return (
    <Fragment>
      <FunnelViewSidePanel />
      <ColumnWrapper className='mb-2 mt-4'>
        <ColumnLeft>
          <div className='d-flex align-items-center h-100'>
            <div
              className={classNames('px-3 py-1 text-white text-center rounded', {
                'bg-danger': !hasAccess,
                'bg-success': hasAccess
              })}
            >
              {
                // eslint-disable-next-line no-nested-ternary
                hasAccess ? (!hasFinished ? 'Em andamento' : 'Finalizado') : 'Pendente'
              }
            </div>
            { hasAccess && (
              <div
                className={classNames('ml-3 px-3 py-1 text-white text-center rounded bg-success', {
                  'bg-danger': completed <= 49,
                  'bg-warning': completed <= 70,
                  'bg-success': completed === 100
                })}
              >
                { funnel.getFormatedPercent(completed) }
              </div>
            )}
          </div>
        </ColumnLeft>
        <ColumnRight isActionBar={true}>
          <Button type='button' className='btn btn-link' onClick={onFunnelDeleteClick}>
            Remover
          </Button>
          <Button type='button' className='btn btn-default' onClick={onFunnelEditClick}>
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
            { `Email: ${customer.get('email')}` }
          </UserInfo>
        </ColumnLeft>
      </ColumnWrapper>
      <Container isWhiteBackground={true}>
        <ViewTable title='Informações Pessoais'>
          <ViewTableRow>
            <ViewTableCell className='w-md-50' label='Nome' value={fullname} />
            <ViewTableCell className='w-md-25' label='E-mail' value={customer.get('email')} />
            <ViewTableCell className='w-md-25' label='Sexo' value={customer.getGenre()} />
          </ViewTableRow>
          <ViewTableRow>
            <ViewTableCell className='w-md-33' label='Celular' value={customer.getFormatedPhone('phone')} />
            <ViewTableCell className='w-md-33' label='Cadastrado em' value={funnel.getFormatedDate('createdAt')} />
            <ViewTableCell className='w-md-33' label='Perguntas respondidas' value={`${funnel.get('currentQuestion')}/${total}`} />
          </ViewTableRow>
        </ViewTable>
      </Container>
      <ConfirmDeleteModal
        onConfirm={onDeleteConfirm}
        onCancel={onDeleteClose}
        isOpen={isDeleteModalOpen}
      >
        <span>
          Deseja remover <strong>{ `${fullname}` }</strong>?
        </span>
      </ConfirmDeleteModal>
    </Fragment>
  )
}

FunnelsView.propTypes = {
  profile: PropTypes.object.isRequired
}

export default React.memo(FunnelsView)
