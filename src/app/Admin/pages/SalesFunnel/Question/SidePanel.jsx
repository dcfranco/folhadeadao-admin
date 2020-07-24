import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { useStructure } from 'hooks'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SidePanelTemplate from 'templates/SidePanelTemplate'
import SidePanelRender from 'components/SidePanelRender'
import QuestionCard from 'admin/components/QuestionCard'
import { Settings } from '@material-ui/icons'
import { bindPathParams } from 'helpers'
import SidePanelConfigModal from './SidePanelConfigModal'

const { Layout, Header, Title, BackLink, Cards, Card, Action, Actions } = SidePanelTemplate

const SalesFunnelQuestionsSidePanel = ({ freeze }) => {
  const { pages } = useStructure()
  const { funnelId, questionId } = useParams()
  const [isModalOpen, toggleModal] = useState(false)
  const [showOnlyActives, toggleShowOnlyActives] = useState(true)

  const history = useHistory()

  const salesFunnel = useSelector(({ admin }) => admin.salesFunnel.getIn(['options', 'selected']))
  const questions = salesFunnel && salesFunnel.get('questions')

  const onSalesFunnelCardClick = useCallback((question) => () => {
    const route = bindPathParams({
      questionId: question.get('id'),
      funnelId
    }, pages.FUNNELS.QUESTION.VIEW)
    history.push(route)
  }, [funnelId])

  const onActionClick = useCallback(() => {
    const route = bindPathParams({
      funnelId
    }, pages.FUNNELS.QUESTION.NEW)
    history.push(route)
  }, [funnelId])

  const onSaveModal = useCallback((values) => {
    toggleModal(false)
    toggleShowOnlyActives(values.get('showOnlyActives'))
  }, [toggleModal, toggleShowOnlyActives])

  const onToggleModal = useCallback(() => {
    toggleModal(!isModalOpen)
  }, [isModalOpen])

  return (
    <SidePanelRender>
      <Layout>
        <Header>
          <BackLink route={pages.FUNNELS.INDEX}>
            Voltar
          </BackLink>
          <Title>
            Etapas
          </Title>
          <Actions>
            <Action onClick={onToggleModal}>
              <Settings />
            </Action>
            <Action onClick={onActionClick}>
              +
            </Action>
          </Actions>
        </Header>
        { questions && questions.size > 0 ? (
          <Cards>
            { questions.filter((question) => {
              if (showOnlyActives && !question.get('isActive')) return false
              return true
            }).map((question) => {
              const isActive = parseInt(question.get('id'), 10) === parseInt(questionId, 10)
              return (
                <Card
                  key={question.get('id')}
                  isActive={isActive}
                  disabled={freeze && !isActive}
                  className={!question.get('isActive') ? 'danger' : ''}
                  onClick={onSalesFunnelCardClick(question)}
                >
                  <QuestionCard title={question.get('title')} description={question.get('description')} order={question.get('order')} />
                </Card>
              )
            }) }
          </Cards>
        ) : (
          <div className='w-100 text-center mt-4 text-dark font-size-sm opacity-06'>
            Não existem perguntas cadastradas
          </div>
        ) }
      </Layout>
      <SidePanelConfigModal isOpen={isModalOpen} onSave={onSaveModal} onCancel={onToggleModal} />
    </SidePanelRender>
  )
}

SalesFunnelQuestionsSidePanel.propTypes = {
  freeze: PropTypes.bool
}

SalesFunnelQuestionsSidePanel.defaultProps = {
  freeze: false
}

export default React.memo(SalesFunnelQuestionsSidePanel)
