import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useStructure } from 'hooks'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SidePanelTemplate from 'templates/SidePanelTemplate'
import SidePanelRender from 'components/SidePanelRender'
import DomainCard from 'admin/components/DomainCard'
import { bindPathParams } from 'helpers'

const { Layout, Header, Title, BackLink, Cards, Card, Action, Actions } = SidePanelTemplate

const SalesFunnelDomainsSidePanel = ({ backRoute }) => {
  const { pages } = useStructure()
  const { funnelId, questionId, domainId } = useParams()
  const history = useHistory()

  const questions = useSelector(({ admin }) => admin.questions.getIn(['options', 'selected']))
  const domains = questions && questions.get('domains')

  const onDomainsCardClick = useCallback((domain) => () => {
    const route = bindPathParams({
      domainId: domain.get('id'),
      questionId,
      funnelId
    }, pages.FUNNELS.QUESTION.EDIT_DOMAIN)
    history.push(route)
  }, [funnelId, questionId])

  const onActionClick = useCallback(() => {
    const route = bindPathParams({
      funnelId,
      questionId
    }, pages.FUNNELS.QUESTION.NEW_DOMAIN)
    history.push(route)
  }, [funnelId, questionId])

  return (
    <SidePanelRender>
      <Layout>
        <Header>
          <BackLink route={backRoute}>
            Voltar
          </BackLink>
          <Title>
            Opções
          </Title>
          <Actions>
            <Action onClick={onActionClick}>
              +
            </Action>
          </Actions>
        </Header>
        { domains && domains.size > 0 ? (
          <Cards>
            { domains.map((domain) => {
              const isActive = parseInt(domain.get('id'), 10) === parseInt(domainId, 10)
              return (
                <Card
                  key={domain.get('id')}
                  isActive={isActive}
                  onClick={onDomainsCardClick(domain)}
                >
                  <DomainCard label={domain.get('label')} value={domain.get('value')} />
                </Card>
              )
            }) }
          </Cards>
        ) : (
          <div className='w-100 text-center mt-4 text-dark font-size-sm opacity-06'>
            Não existem respostas cadastradas
          </div>
        ) }
      </Layout>
    </SidePanelRender>
  )
}

SalesFunnelDomainsSidePanel.propTypes = {
  backRoute: PropTypes.string.isRequired
}

export default React.memo(SalesFunnelDomainsSidePanel)
