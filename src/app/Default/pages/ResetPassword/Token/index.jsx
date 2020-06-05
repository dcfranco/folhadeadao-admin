import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useLocation, useHistory } from 'react-router'
import { reduxForm } from 'redux-form/immutable'

import SvgImage from 'components/SvgImage'
import Token from 'components/Token'
import Button from 'components/Button'
import { ToastContext } from 'components/ToastProvider'

import { passwordRecoverySendToken } from 'default/actions/password'

import FeedbackTemplate from 'templates/FeedbackTemplate'

const { AVAILABLE_IMAGES } = SvgImage
const { Layout, Header, Content } = FeedbackTemplate

const formName = 'resetPasswordToken'
const ResetPasswordToken = ({ handleSubmit, invalid, profile: { pages } }) => {
  const { showSuccessToast, showErrorToast } = useContext(ToastContext)
  const location = useLocation()
  const history = useHistory()

  useEffect(() => {
    const { state } = location
    if (!state) {
      history.push(pages.RESET_PASSWORD.INDEX)
      return
    }

    showSuccessToast({
      message: 'Token enviado!'
    })
  }, [])

  const dispatch = useDispatch()
  const onResendToken = async () => {
    const { state: { email } } = location
    const response = await dispatch(passwordRecoverySendToken(email))
    if (response) {
      showSuccessToast({
        message: 'Token enviado!'
      })
    }
  }

  const onSubmit = (values) => {
    const { state: { email } } = location
    if (!values || !values.get('token')) {
      showErrorToast({
        message: 'Favor preencher o token corretamente'
      })
      return
    }

    const token = values.get('token').reduce((result, value) => {
      const newToken = result + value
      return newToken
    }, '')

    history.push(pages.RESET_PASSWORD.PASSWORD, {
      email,
      token
    })
  }
  return (
    <Layout>
      <Header
        desktopIconName={AVAILABLE_IMAGES.LOCK_FEEDBACK_TOKEN}
        mobileIconName={AVAILABLE_IMAGES.LOCK_FEEDBACK_TOKEN_MOBILE}
      >
        Recuperar senha
      </Header>
      <Content>
        <form onSubmit={handleSubmit(onSubmit)} className='pb-4'>
          <div className='px-3 px-md-0'>
            Acabamos de enviar para seu email o código de verificação.
            Insira o código que enviamos abaixo para digitar uma nova senha:
          </div>

          <Token />

          <div className='d-flex flex-column flex-md-row justify-content-between align-items-center mt-4'>
            <div className=''>
              <span className='d-block mb-n1'>Não recebeu o código?</span>
              <Button type='button' className='btn btn-link p-0 m-0' onClick={onResendToken}>Enviar código novamente</Button>
            </div>
            <div>
              <Button disabled={invalid} className='btn btn-primary mt-2 mt-md-0 w-100 w-md-auto py-1'>Enviar</Button>
            </div>
          </div>
        </form>
      </Content>
    </Layout>
  )
}

ResetPasswordToken.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  invalid: PropTypes.bool.isRequired
}

export default reduxForm({
  form: formName
})(ResetPasswordToken)
