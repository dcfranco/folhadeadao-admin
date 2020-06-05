import React, { Fragment, useEffect, useContext, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Field, Form, reduxForm } from 'redux-form/immutable'
import { ColumnWrapper, ColumnLeft, ColumnRight, Container, Title } from 'templates/PageTemplate'
import FormContent, { Row, Element } from 'components/FormContent'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { funnelCreateRequest, funnelResetSelected } from 'seller/actions/funnels'
import { customerCreateRequest } from 'seller/actions/customers'
import moment from 'moment'
import { BaseUrl } from 'configs'

import CustomersFactory from 'factories/Customers'

import { ToastContext } from 'components/ToastProvider'
import Button from 'components/Button'
import ReduxFormSelect from 'components/ReduxFormSelect'
import ReduxFormInput from 'components/ReduxFormInput'

import { required, email } from 'form/validators'
import { phoneNormalizer } from 'form/normalizers'

export const formName = 'newEditFunnelForm'

const FunnelsForm = (
  { handleSubmit, submit, invalid }
) => {
  const { showErrorToast, showSuccessToast } = useContext(ToastContext)
  const seller = useSelector(({ user }) => user.getIn(['data', 'seller']))
  const history = useHistory()
  const dispatch = useDispatch()

  const clientDataRef = useRef()

  useEffect(() => () => {
    dispatch(funnelResetSelected())
  }, [])

  const onCancel = useCallback(() => {
    history.goBack()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      const { current: clientData } = clientDataRef
      const input = clientData.querySelector('input')
      if (input) {
        input.focus()
      }
    })
  }, [])

  const createCustomer = useCallback(async (values) => {
    const request = CustomersFactory.createRequest(values)
    const response = await dispatch(customerCreateRequest(request))
    return response
  }, [])

  const onSubmit = useCallback(async (values) => {
    const customer = await createCustomer(values)
    if (customer) {
      const response = await dispatch(funnelCreateRequest({
        createdAt: moment().toISOString(),
        hasFinished: false,
        customerId: customer.id,
        sellerId: seller.get('id')
      }))
      if (response) {
        navigator.clipboard.writeText(`${BaseUrl}/${response.token}`).then(() => {
          showSuccessToast({
            message: 'Link copiado para o clipboard!'
          })
        })
      } else {
        showErrorToast({
          message: 'Favor corrigir os itens abaixo.'
        })
      }
    }
  }, [])

  return (
    <Fragment>
      <ColumnWrapper>
        <ColumnLeft>
          <Title>Cadastro de acessos</Title>
        </ColumnLeft>
        <ColumnRight isActionBar={true}>
          <Button className='btn btn-default mr-3' onClick={onCancel}>
            Voltar
          </Button>
          <Button onClick={() => submit()} disabled={invalid}>
            Salvar
          </Button>
        </ColumnRight>
      </ColumnWrapper>
      <Container isWhiteBackground={true} autofocus={true}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormContent title='Dados do Cliente' ref={clientDataRef}>
            <Row>
              <Element lg='4'>
                <Field
                  type='text'
                  name='firstName'
                  label='Nome: *'
                  id='firstName'
                  placeholder='Nome'
                  component={ReduxFormInput}
                  validate={[required]}
                />
              </Element>
              <Element lg='4'>
                <Field
                  type='text'
                  name='lastName'
                  label='Sobrenome: *'
                  id='lastName'
                  placeholder='Sobrenome'
                  component={ReduxFormInput}
                  validate={[required]}
                />
              </Element>
              <Element lg='4'>
                <Field
                  name='genre'
                  label='Sexo: *'
                  id='genre'
                  placeholder='Sexo'
                  options={[
                    { value: 'M', label: 'Masculino' },
                    { value: 'F', label: 'Feminino' }
                  ]}
                  component={ReduxFormSelect}
                  validate={[required]}
                />
              </Element>
            </Row>
            <Row>
              <Element lg='4'>
                <Field
                  type='text'
                  name='phone'
                  label='Telefone:'
                  id='phone'
                  placeholder='Telefone'
                  normalize={phoneNormalizer}
                  component={ReduxFormInput}
                />
              </Element>
              <Element lg='8'>
                <Field
                  type='text'
                  name='email'
                  label='Email: *'
                  id='email'
                  placeholder='Email'
                  component={ReduxFormInput}
                  validate={[required, email]}
                />
              </Element>
            </Row>
          </FormContent>
        </Form>
      </Container>

    </Fragment>
  )
}

FunnelsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired
}

export default reduxForm({
  form: formName
})(FunnelsForm)
