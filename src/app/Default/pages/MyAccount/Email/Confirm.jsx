import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Container } from 'templates/PageTemplate'
import { reduxForm, Field, Form } from 'redux-form/immutable'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, Redirect } from 'react-router-dom'
import { userUpdateInformations } from 'core/actions/user'
import { ToastContext } from 'components/ToastProvider'

import ReduxFormInput from 'components/ReduxFormInput'
import { required } from 'form/validators'

import { formName } from '.'

const MyAccountEmailConfirm = ({ handleSubmit, profile: { pages } }) => {
  const location = useLocation()
  if (!location.state
  || !location.state.email
  || !location.state.token) {
    return (
      <Redirect to={pages.MY_ACCOUNT.EMAIL.INDEX} />
    )
  }

  const { showSuccessToast } = useContext(ToastContext)
  const error = useSelector(state => state.errors.getFieldError('non_field_errors'))
  const dispatch = useDispatch()
  const history = useHistory()
  const { state: { email, token } } = location

  const onSubmit = async (values) => {
    const password = values.get('password')
    const response = await dispatch(userUpdateInformations(email, token, password))
    if (response) {
      showSuccessToast({
        message: 'Email alterado com sucesso'
      })
      history.push(pages.MY_ACCOUNT.INDEX)
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='row'>
          <div className='col-12 col-md-5 offset-md-4 col-lg-4 offset-lg-4'>
            <span className='d-block font-size-lg font-weight-bold mb-3'>
              Para sua segurança, informe sua senha para confirmar a validação do email.
            </span>
            <Field
              name='password'
              id='password'
              placeholder='Senha'
              type='password'
              component={ReduxFormInput}
              validate={[required]}
              formClassName='w-100'
              errorText={error}
            />
          </div>
        </div>
      </Form>
    </Container>
  )
}

MyAccountEmailConfirm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

export default reduxForm({
  form: formName
})(MyAccountEmailConfirm)
