import React, { useCallback } from 'react'
import { useStructure } from 'hooks'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SidePanelTemplate from 'templates/SidePanelTemplate'
import SidePanelRender from 'components/SidePanelRender'
import FunnelCard from 'seller/components/FunnelCard'
import { bindPathParams } from 'helpers'

const { Layout, Header, Title, BackLink, Cards, Card, Action } = SidePanelTemplate

const UserViewSidePanel = () => {
  const { pages } = useStructure()
  const { funnelId } = useParams()
  const history = useHistory()

  const funnels = useSelector(({ seller }) => seller.funnels.get('results'))
  // const options = useSelector(({ seller }) => seller.funnels.get('options'))
  // const pages = useSelector(({ seller }) => seller.funnels.getTotalPages())
  // const selectedPage = options.get('currentPageIndex')

  const onUserCardClick = useCallback((funnel) => () => {
    const route = bindPathParams({
      funnelId: funnel.get('id')
    }, pages.FUNNELS.VIEW)
    history.push(route)
  }, [])

  const onActionClick = useCallback(() => history.push(pages.FUNNELS.NEW), [])

  return (
    <SidePanelRender>
      <Layout>
        <Header>
          <BackLink route={pages.FUNNELS.INDEX}>
            Voltar
          </BackLink>
          <Title>
            Clientes
          </Title>
          <Action onClick={onActionClick}>
            +
          </Action>
        </Header>
        { funnels.size > 0 ? (
          <Cards>
            { funnels.map((funnel) => {
              const userClient = funnel.get('userClient')
              return (
                <Card
                  key={funnel.get('id')}
                  isActive={parseInt(funnel.get('id'), 10) === parseInt(funnelId, 10)}
                  onClick={onUserCardClick(funnel)}
                >
                  <FunnelCard title={userClient.getFullName()} cpf={userClient.get('email')} />
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

export default React.memo(UserViewSidePanel)
