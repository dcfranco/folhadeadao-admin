import React, { useEffect, useState, useContext, useRef } from 'react'
import PropTypes from 'prop-types'
import zxcvbn from 'zxcvbn'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RemoveRedEyeOutlined } from '@material-ui/icons'
import { reduxForm, Field, Form, formValueSelector } from 'redux-form/immutable'
import Layout, { ColumnWrapper, ColumnLeft, ColumnRight, Title, BackLink, Container } from 'templates/PageTemplate'
import { userUpdateInformations } from 'core/actions/user'
import { ToastContext } from 'components/ToastProvider'
import Button from 'components/Button'
import PasswordTips from 'components/PasswordTips'
import PasswordStrength from 'components/PasswordStrength'

import ReduxFormInputBuilder from 'components/ReduxFormInput/Builder'
import InputAddonBuilder from 'components/ReduxFormInput/builders/InputAddonBuilder'
import { required, weakPassword, passwordsMatch } from 'form/validators'

export const formName = 'passwordMyAccountForm'
const selector = formValueSelector(formName)

const InputAddon = InputAddonBuilder()
  .rightPosition()
  .renderMethod(() => (
    <div className='icon-right-addon'>
      <RemoveRedEyeOutlined />
    </div>
  ))
  .build()

const ReduxFormInputWithAddon = ReduxFormInputBuilder()
  .rightAddon(InputAddon)
  .build()

const MyAccountContact = ({ handleSubmit, invalid, submit, profile: { pages } }) => {
  const weakPasswordRef = useRef(weakPassword(0))
  const [scoreDescription, setScoreDescription] = useState([])
  const [isPasswordEyeActive, togglePasswordEyeActive] = useState()
  const { showSuccessToast } = useContext(ToastContext)
  const history = useHistory()
  const dispatch = useDispatch()

  const password = useSelector(state => selector(state, 'password'))
  useEffect(() => {
    if (!password) {
      setScoreDescription([])
      return
    }
    const { score } = zxcvbn(password.substr(0, 100))
    if (score <= 2) {
      setScoreDescription([30, 'danger', 'Senha Fraca'])
      weakPasswordRef.current = weakPassword(30)
    } else if (score === 3) {
      setScoreDescription([65, 'warning', 'Senha Boa'])
      weakPasswordRef.current = weakPassword(65)
    } else {
      setScoreDescription([100, 'primary', 'Senha Forte'])
      weakPasswordRef.current = weakPassword(100)
    }
  }, [password])

  const onSubmit = async (values) => {
    const newPassword = values.get('password')
    const oldPassword = values.get('password_atual')
    const response = await dispatch(userUpdateInformations(
      null,
      null,
      oldPassword,
      newPassword,
      null
    ))
    if (response) {
      showSuccessToast({
        message: 'Sua senha foi redefinida com sucesso'
      })
      history.push(pages.MY_ACCOUNT.INDEX)
    }
  }

  return (
    <Layout>
      <ColumnWrapper>
        <ColumnLeft>
          <BackLink onClick={() => history.goBack()}>
            voltar
          </BackLink>
          <Title>Redefinir senha</Title>
        </ColumnLeft>
        <ColumnRight>
          <Button
            disabled={invalid}
            onClick={() => submit()}
          >
            Confirmar
          </Button>
        </ColumnRight>
      </ColumnWrapper>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='row'>
            <div className='col-12 col-md-8 offset-md-2'>
              <div className='bg-light border border-low-dark mt-4 border-dotted px-4 py-5'>
                <div className='row'>
                  <div className='col-xs-9 offset-xs-1 col-md-6 offset-md-3'>
                    <div className='row'>
                      <div className='col-12'>
                        <Field
                          label='Senha atual'
                          type={isPasswordEyeActive === 'password_atual' ? 'text' : 'password'}
                          name='password_atual'
                          id='password_atual'
                          component={ReduxFormInputWithAddon}
                          onRightAddonClick={
                            ({ name }) => togglePasswordEyeActive(
                              isPasswordEyeActive === name ? false : name
                            )
                          }
                          validate={[required]}
                        />
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-12'>
                        <Field
                          label='Nova Senha'
                          type={isPasswordEyeActive === 'password' ? 'text' : 'password'}
                          name='password'
                          id='password'
                          component={ReduxFormInputWithAddon}
                          onRightAddonClick={
                            ({ name }) => togglePasswordEyeActive(
                              isPasswordEyeActive === name ? false : name
                            )
                          }
                          validate={[required, weakPasswordRef.current]}
                        />
                        <PasswordTips />
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-12'>
                        <Field
                          label='Nova Senha'
                          type={isPasswordEyeActive === 'confirm_password' ? 'text' : 'password'}
                          name='confirm_password'
                          id='confirm_password'
                          component={ReduxFormInputWithAddon}
                          onRightAddonClick={
                            ({ name }) => togglePasswordEyeActive(
                              isPasswordEyeActive === name ? false : name
                            )
                          }
                          validate={[required, passwordsMatch]}
                        />
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-12'>
                        <PasswordStrength score={scoreDescription}>
                          Digite uma senha segura
                        </PasswordStrength>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Container>
    </Layout>
  )
}

MyAccountContact.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  invalid: PropTypes.bool.isRequired
}

export default reduxForm({
  form: formName
})(MyAccountContact)
