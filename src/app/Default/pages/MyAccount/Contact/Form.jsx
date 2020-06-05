import React, { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { Container } from 'templates/PageTemplate'
import { reduxForm, Field, Form } from 'redux-form/immutable'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { myAccountPhoneSendToken } from 'default/actions/myAccount'
import { ToastContext } from 'components/ToastProvider'

import ReduxFormInput from 'components/ReduxFormInput'
import { required } from 'form/validators'
import { phoneNormalizer } from 'form/normalizers'

import { formName } from '.'

const MyAccountContactForm = ({ handleSubmit, initialize, profile: { pages } }) => {
  const { showSuccessToast, showErrorToast } = useContext(ToastContext)
  const userPhone = useSelector(state => state.user.getIn(['data', 'telefone_celular']))
  const phoneError = useSelector(state => state.errors.getFieldError('telefone_celular'))
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    const phone = typeof userPhone === 'string' ? userPhone.slice(3, userPhone.length) : ''
    initialize({
      phone: phoneNormalizer(phone)
    })
  }, [userPhone])

  useEffect(() => {
    if (phoneError) {
      showErrorToast({
        message: phoneError
      })
    }
  }, [phoneError])

  const onSubmit = async (values) => {
    const value = values.get('phone')
    const phoneValue = `+55${value.replace(/([( ]|[) ])+/g, '')}`
    const response = await dispatch(myAccountPhoneSendToken(phoneValue))
    if (response) {
      showSuccessToast({
        message: 'Token enviado'
      })
      history.push(pages.MY_ACCOUNT.CONTACT.TOKEN, {
        phone: value
      })
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='row'>
          <div className='col-12 col-md-5 col-lg-3'>
            <Field
              name='phone'
              id='phone'
              label='Telefone'
              placeholder='Telefone'
              component={ReduxFormInput}
              normalize={phoneNormalizer}
              validate={[required]}
            />
          </div>
        </div>
      </Form>
    </Container>
  )
}

MyAccountContactForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

export default reduxForm({
  form: formName
})(MyAccountContactForm)
