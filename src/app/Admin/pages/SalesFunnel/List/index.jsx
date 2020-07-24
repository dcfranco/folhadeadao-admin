import React, { Fragment, useEffect, useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Cards, { Card, CardRow, CardTitle, CardContent, CardInfo } from 'components/Cards'
import { ColumnWrapper, ColumnLeft, ColumnRight, Title, Container } from 'templates/PageTemplate'
import { salesFunnelsAsyncRequest, salesFunnelsUpdatePage } from 'admin/actions/sales-funnel'
import Pagination from 'components/Pagination'
import Button from 'components/Button'
import { bindPathParams } from 'helpers'
import NewSalesFunnelModal from './NewSalesFunnelModal'

const SalesFunnelList = ({ profile: { pages: profilePages } }) => {
  const dispatch = useDispatch()
  const [isModalOpen, toggleModal] = useState(false)
  const salesFunnels = useSelector(({ admin }) => admin.salesFunnel.get('results'))
  const options = useSelector(({ admin }) => admin.salesFunnel.get('options'))
  const pages = useSelector(({ admin }) => admin.salesFunnel.getTotalPages())
  const selectedPage = options.get('currentPageIndex')
  const history = useHistory()

  const requestSalesFunnelList = useCallback(() => {
    dispatch(salesFunnelsAsyncRequest())
  }, [])

  useEffect(() => {
    requestSalesFunnelList()
  }, [selectedPage])

  const onPageChange = useCallback((page) => async () => {
    dispatch(salesFunnelsUpdatePage(page))
  }, [])

  const onSalesFunnelClick = useCallback((salesFunnel) => () => {
    const route = bindPathParams({
      funnelId: salesFunnel.get('id')
    }, profilePages.FUNNELS.QUESTION.INDEX)
    history.push(route)
  }, [])

  const onToggleModal = useCallback(() => {
    toggleModal(!isModalOpen)
  }, [isModalOpen])

  return (
    <Fragment>
      <ColumnWrapper>
        <ColumnLeft>
          <Title>Lista de Funis</Title>
        </ColumnLeft>
        <ColumnRight>
          <Button type='button' className='btn btn-primary' onClick={onToggleModal}>
            Novo
          </Button>
        </ColumnRight>
      </ColumnWrapper>
      <Container>
        { salesFunnels.size > 0 ? (
          <Cards>
            { salesFunnels.map((salesFunnel) => {
              return (
                <Card
                  key={salesFunnel.get('id')}
                  onClick={onSalesFunnelClick(salesFunnel)}
                >
                  <CardRow>
                    <CardTitle isAvatarVisible={true}>
                      { salesFunnel.get('description') }
                    </CardTitle>
                  </CardRow>
                  <CardContent>
                    <CardInfo title='Perguntas'>
                      { salesFunnel.get('steps') }
                    </CardInfo>
                    <CardInfo title='Ativo'>
                      { salesFunnel.get('isActive') ? 'Sim' : 'Não' }
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
        <NewSalesFunnelModal
          isOpen={isModalOpen}
          toggle={onToggleModal}
          pages={profilePages}
        />
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

SalesFunnelList.propTypes = {
  profile: PropTypes.object.isRequired
}

export default React.memo(SalesFunnelList)
