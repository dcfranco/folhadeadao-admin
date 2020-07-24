import React, { Fragment, useEffect, useCallback, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Cards, {
  Card,
  CardRow,
  CardTitle,
  CardContent,
  CardInfo,
  CardAction
} from 'components/Cards'
import { ColumnWrapper, ColumnLeft, Title, Container } from 'templates/PageTemplate'
import { sellersAsyncRequest, sellerDeleteRequest, sellersUpdatePage } from 'admin/actions/sellers'
import { bindPathParams } from 'helpers'
import Pagination from 'components/Pagination'
import SellersSearchForm from 'admin/components/SellersSearchForm'
import Button from 'components/Button'
import CreateGenericConfirmModal from 'components/GenericConfirmModal'
import { ToastContext } from 'components/ToastProvider'
import EnableAccessModal from './EnableAccessModal'

const DisableAccessModal = CreateGenericConfirmModal({
  confirmBtnClassName: 'btn-danger',
  title: 'Revogar acesso',
  cancelOnClose: true
})

const SellersList = ({ profile: { pages: profilePages } }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { showErrorToast, showSuccessToast } = useContext(ToastContext)
  const [isEnableAccessModalOpen, toggleEnableAccessModal] = useState(false)
  const [isDisableAccessModalOpen, toggleDisableAccessModal] = useState(false)
  const sellers = useSelector(({ admin }) => admin.sellers.get('results'))
  const options = useSelector(({ admin }) => admin.sellers.get('options'))
  const pages = useSelector(({ admin }) => admin.sellers.getTotalPages())
  const selectedPage = options.get('currentPageIndex')

  const requestSellersList = useCallback(() => {
    dispatch(sellersAsyncRequest())
  }, [])

  useEffect(() => {
    requestSellersList()
  }, [selectedPage])

  const onPageChange = useCallback(
    (page) => async () => {
      dispatch(sellersUpdatePage(page))
    },
    []
  )

  const onSellerClick = useCallback(
    (seller) => () => {
      const route = bindPathParams(
        {
          userId: seller.getIn(['user', 'id'])
        },
        profilePages.USERS.VIEW
      )
      history.push(route)
    },
    []
  )

  const toggleAccessModals = useCallback(
    (seller) => (event) => {
      if (event) event.stopPropagation()
      if (isEnableAccessModalOpen || (seller && (!seller.get('user') || seller.getIn(['user', 'isBlocked'])))) {
        return toggleEnableAccessModal(!isEnableAccessModalOpen && seller)
      }
      return toggleDisableAccessModal(!isDisableAccessModalOpen && seller)
    },
    [
      isEnableAccessModalOpen,
      isDisableAccessModalOpen,
      toggleEnableAccessModal,
      toggleDisableAccessModal
    ]
  )

  const onDisableAccess = useCallback(
    () => {
      const seller = isDisableAccessModalOpen
      dispatch(sellerDeleteRequest(seller.get('ID'))).then(async (response) => {
        if (response) {
          await dispatch(sellersAsyncRequest(true))
          showSuccessToast({ message: 'A liberação foi efetuada com sucesso!' })
          return
        }
        showErrorToast({ message: 'Ocorreu um problema ao efetuar a liberação.' })
      })
      toggleDisableAccessModal(false)
    },
    [isDisableAccessModalOpen, toggleDisableAccessModal, dispatch]
  )

  return (
    <Fragment>
      <SellersSearchForm requestSellersList={requestSellersList} />
      <ColumnWrapper>
        <ColumnLeft>
          <Title>Representantes</Title>
        </ColumnLeft>
      </ColumnWrapper>
      <Container>
        {sellers.size > 0 ? (
          <Cards>
            {sellers.map((seller) => {
              const user = seller.get('user')
              const isBlocked = seller.getIn(['user', 'isBlocked'])
              return (
                <Card key={seller.get('ID')} onClick={onSellerClick(seller)}>
                  <CardRow>
                    <CardTitle isAvatarVisible={false}>{seller.get('name')}</CardTitle>
                    <CardAction>
                      <Button
                        className='btn btn-light btn-sm'
                        type='button'
                        onClick={toggleAccessModals(seller)}
                      >
                        {!user && 'Liberar acesso' }
                        {user && isBlocked && 'Desbloquear' }
                        {user && !isBlocked && 'Bloquear' }
                      </Button>
                    </CardAction>
                  </CardRow>
                  <CardContent>
                    <CardInfo title='Último acesso'>
                      {user ? user.getFormatedDate('lastLogin') : '-'}
                    </CardInfo>
                    <CardInfo title='Status'>
                      <span className={!user || isBlocked ? 'text-danger' : 'text-success'}>
                        {!user && 'Sem acesso' }
                        {user && isBlocked && 'Bloqueado' }
                        {user && !isBlocked && 'Com acesso' }
                      </span>
                    </CardInfo>
                  </CardContent>
                </Card>
              )
            })}
          </Cards>
        ) : (
          <div>Sem resultado</div>
        )}
        <EnableAccessModal
          seller={isEnableAccessModalOpen}
          toggle={toggleAccessModals}
        />
        <DisableAccessModal
          isOpen={isDisableAccessModalOpen}
          onConfirm={onDisableAccess}
          onCancel={toggleAccessModals()}
          cancelOnClose={true}
        >
          Deseja mesmo bloquear o acesso do representante ao sistema?
        </DisableAccessModal>
      </Container>
      <ColumnWrapper>
        <ColumnLeft>
          <Pagination pages={pages} selectedPage={selectedPage} onChange={onPageChange} />
        </ColumnLeft>
      </ColumnWrapper>
    </Fragment>
  )
}

SellersList.propTypes = {
  profile: PropTypes.object.isRequired
}

export default React.memo(SellersList)
