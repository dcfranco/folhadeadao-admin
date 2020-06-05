import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { Container } from 'templates/PageTemplate'
import { reduxForm, Field, Form } from 'redux-form/immutable'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { myAccountEmailSendToken } from 'default/actions/myAccount'
import { ToastContext } from 'components/ToastProvider'

import ReduxFormInput from 'components/ReduxFormInput'
import { required, email } from 'form/validators'

import { formName } from '.'

const MyAccountEmailForm = ({ handleSubmit, initialize, profile: { pages } }) => {
  const { showSuccessToast, showErrorToast } = useContext(ToastContext)
  const userEmail = useSelector(state => state.user.getIn(['data', 'email']))
  const emailError = useSelector(state => state.errors.getFieldError('email'))
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    initialize({
      email: userEmail
    })
  }, [email])

  useEffect(() => {
    if (emailError) {
      showErrorToast({
        message: emailError
      })
    }
  }, [emailError])

  const onSubmit = async (values) => {
    const emailValue = values.get('email')
    const response = await dispatch(myAccountEmailSendToken(emailValue))
    if (response) {
      showSuccessToast({
        message: 'Token enviado'
      })
      history.push(pages.MY_ACCOUNT.EMAIL.TOKEN, {
        email: emailValue
      })
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='row'>
          <div className='col-12 col-md-5 col-lg-3'>
            <Field
              name='email'
              id='email'
              label='Email'
              placeholder='Email'
              component={ReduxFormInput}
              validate={[required, email]}
            />
          </div>
        </div>
      </Form>
    </Container>
  )
}

MyAccountEmailForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

export default reduxForm({
  form: formName
})(MyAccountEmailForm)
