import React, { useCallback } from 'react'
import { useStructure } from 'hooks'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SidePanelTemplate from 'templates/SidePanelTemplate'
import SidePanelRender from 'components/SidePanelRender'
import SellerCard from 'admin/components/SellerCard'
import { bindPathParams } from 'helpers'

const { Layout, Header, Title, BackLink, Cards, Card, Action } = SidePanelTemplate

const SellerViewSidePanel = () => {
  const { pages } = useStructure()
  const { sellerId } = useParams()
  const history = useHistory()

  const sellers = useSelector(({ admin }) => admin.sellers.get('results'))
  // const options = useSelector(({ admin }) => admin.sellers.get('options'))
  // const pages = useSelector(({ admin }) => admin.sellers.getTotalPages())
  // const selectedPage = options.get('currentPageIndex')

  const onSellerCardClick = useCallback((seller) => () => {
    const route = bindPathParams({
      sellerId: seller.get('id')
    }, pages.SELLERS.VIEW)
    history.push(route)
  }, [])

  const onActionClick = useCallback(() => history.push(pages.SELLERS.NEW), [])

  return (
    <SidePanelRender>
      <Layout>
        <Header>
          <BackLink route={pages.SELLERS.INDEX}>
            Voltar
          </BackLink>
          <Title>
            Funcionários
          </Title>
          <Action onClick={onActionClick}>
            +
          </Action>
        </Header>
        { sellers.size > 0 ? (
          <Cards>
            { sellers.map((seller) => {
              return (
                <Card
                  key={seller.get('id')}
                  isActive={seller.get('id') === sellerId}
                  onClick={onSellerCardClick(seller)}
                >
                  <SellerCard title={seller.getFullName()} cpf={seller.get('cpf')} />
                </Card>
              )
            }) }
          </Cards>
        ) : (
          <div className='w-100 text-center mt-2'>
            Sem registros
          </div>
        ) }
      </Layout>
    </SidePanelRender>
  )
}

export default React.memo(SellerViewSidePanel)
