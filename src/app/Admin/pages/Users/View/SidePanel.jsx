import React, { useCallback } from 'react'
import { useStructure } from 'hooks'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SidePanelTemplate from 'templates/SidePanelTemplate'
import SidePanelRender from 'components/SidePanelRender'
import SellerCard from 'admin/components/SellerCard'
import { bindPathParams } from 'helpers'

const { Layout, Header, Title, BackLink, Cards, Card, Action } = SidePanelTemplate

const UserViewSidePanel = () => {
  const { pages } = useStructure()
  const { userId } = useParams()
  const history = useHistory()

  const users = useSelector(({ admin }) => admin.users.get('results'))
  // const options = useSelector(({ admin }) => admin.users.get('options'))
  // const pages = useSelector(({ admin }) => admin.users.getTotalPages())
  // const selectedPage = options.get('currentPageIndex')

  const onUserCardClick = useCallback((user) => () => {
    const route = bindPathParams({
      userId: user.get('id')
    }, pages.USERS.VIEW)
    history.push(route)
  }, [])

  const onActionClick = useCallback(() => history.push(pages.USERS.NEW), [])

  return (
    <SidePanelRender>
      <Layout>
        <Header>
          <BackLink route={pages.USERS.INDEX}>
            Voltar
          </BackLink>
          <Title>
            Usuários
          </Title>
          <Action onClick={onActionClick}>
            +
          </Action>
        </Header>
        { users.size > 0 ? (
          <Cards>
            { users.map((user) => {
              return (
                <Card
                  key={user.get('id')}
                  isActive={user.get('id') === userId}
                  onClick={onUserCardClick(user)}
                >
                  <SellerCard title={user.getFullName()} cpf={user.get('cpf')} />
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
