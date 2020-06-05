// @flow
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form/immutable'
import ReduxFormInput from 'components/ReduxFormInput'
import Button from 'components/Button'
import { passwordRecoverySendToken } from 'default/actions/password'
import { required, cpfOrEmailValidator } from 'form/validators'
import { CleanTemplate } from 'templates'
import { cpfOrEmailNormalizer } from 'form/normalizers'

import type { TResetPasswordProps } from 'default/types'

const formName = 'resetPasswordForm'
const { Content, HeaderTitle, Footer } = CleanTemplate

type TResetPasswordFormProps = {
  ...TResetPasswordProps,
  handleSubmit: Function,
  invalid: boolean,
}
const ResetPasswordForm = (
  { handleSubmit, profile: { pages }, invalid }: TResetPasswordFormProps
) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const onSubmit = async (values) => {
    const response = await dispatch(passwordRecoverySendToken(values.get('email_cpf')))
    if (response) {
      history.push(pages.RESET_PASSWORD.TOKEN, {
        email: values.get('email_cpf')
      })
    }
  }

  return (
    <Content>
      <HeaderTitle linkTo={pages.LOGIN}>
        Recuperar Senha
      </HeaderTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='row'>
          <div className='col-12'>
            <Field
              label='Email ou CPF'
              type='text'
              name='email_cpf'
              id='email_cpf'
              placeholder='Insira seu e-mail ou CPF'
              validate={[required, cpfOrEmailValidator]}
              normalize={cpfOrEmailNormalizer}
              component={ReduxFormInput}
              inputMode='email'
            />
          </div>
        </div>
        <Footer>
          <Button className='btn btn-primary mt-2 mt-md-0 w-100 w-md-auto' disabled={invalid}>Enviar</Button>
        </Footer>
      </form>
    </Content>
  )
}

export default reduxForm({
  form: formName
})(ResetPasswordForm)
