import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import SvgImage from 'components/SvgImage'
import { useSelector } from 'react-redux'

import FeedbackTemplate from 'templates/FeedbackTemplate'

const { AVAILABLE_IMAGES } = SvgImage
const { Layout, Header, Content, Links, Link } = FeedbackTemplate

const Feedback = ({ profile: { pages } }) => {
  const history = useHistory()
  const user = useSelector(state => state.user.get('data'))

  return (
    <Layout>
      <Header
        desktopIconName={AVAILABLE_IMAGES.REGISTER_FEEDBACK_DESKTOP_LOGO}
        mobileIconName={AVAILABLE_IMAGES.REGISTER_FEEDBACK_MOBILE_LOGO}
      >
        Falta pouco!
      </Header>
      <Content>
        Enviamos um email de autenticação para
        <strong> { user.getHiddenEmail() } </strong>,
        somente com o email autenticado você consegue solicitar crédito.
        <Links>
          <Link
            onClick={() => history.push(pages.LOGIN)}
            hasArrow={true}
          >
            Voltar para a página inicial
          </Link>
          <Link
            onClick={() => history.push(pages.PROFILES)}
            hasArrow={true}
          >
            Quero simular crédito e validar meu email depois
          </Link>
        </Links>
      </Content>
    </Layout>
  )
}

Feedback.propTypes = {
  profile: PropTypes.object.isRequired
}

export default Feedback
