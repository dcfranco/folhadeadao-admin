import React, { Fragment, useEffect, useContext, useRef, useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import { Field, Form, reduxForm } from 'redux-form/immutable'
import { ColumnWrapper, ColumnLeft, ColumnRight, Container, Title } from 'templates/PageTemplate'
import FormContent, { Row, Element } from 'components/FormContent'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { funnelCreateRequest, funnelResetSelected, funnelAsyncRequest } from 'seller/actions/funnels'
import { customerCreateRequest, customerEditRequest } from 'seller/actions/customers'
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
  { handleSubmit, submit, invalid, initialize, profile: { pages } }
) => {
  const [isEditMode, toggleEditMode] = useState(false)
  const { showErrorToast, showSuccessToast } = useContext(ToastContext)
  const { funnelId } = useParams()
  const sellerSession = useSelector(({ user }) => user.getIn(['data', 'seller']))
  const funnel = useSelector(({ seller }) => seller.funnels.getIn(['options', 'selected']))
  const history = useHistory()
  const dispatch = useDispatch()

  const clientDataRef = useRef()

  const funnelNotFound = () => {
    showErrorToast({
      message: 'Cadastro não encontrado!'
    })
    history.push(pages.FUNNELS.INDEX)
  }

  useEffect(() => () => {
    toggleEditMode(false)
    dispatch(funnelResetSelected())
  }, [])

  const onCancel = useCallback(() => {
    history.goBack()
  }, [])

  useEffect(() => {
    if (funnelId) {
      if (!funnel) {
        dispatch(funnelAsyncRequest(funnelId)).then((response) => {
          if (!response) {
            funnelNotFound()
            return
          }
          toggleEditMode(true)
        })
      } else {
        toggleEditMode(true)
      }
    } else {
      toggleEditMode(false)
    }
  }, [funnelId])

  const createCustomer = useCallback(async (values) => {
    const request = CustomersFactory.createRequest(values)
    const response = await dispatch(customerCreateRequest(request))
    return response
  }, [])

  const editCustomer = useCallback(async (customerId, values) => {
    const request = CustomersFactory.editRequest(values)
    const response = await dispatch(customerEditRequest(customerId, request))
    return response
  }, [])

  useEffect(() => {
    if (isEditMode && funnel) {
      const customer = funnel.get('customer')
      initialize(new Map({
        id: customer.get('id'),
        firstName: customer.get('firstName'),
        lastName: customer.get('lastName'),
        email: customer.get('email'),
        genre: customer.get('genre'),
        phone: phoneNormalizer(customer.get('phone'))
      }))
    }
  }, [isEditMode, funnel])


  const onSubmit = async (values) => {
    if (!funnelId) {
      const customer = await createCustomer(values)
      if (customer) {
        const response = await dispatch(funnelCreateRequest({
          createdAt: moment().toISOString(),
          hasFinished: false,
          customerId: customer.id,
          sellerId: sellerSession.get('id')
        }))
        if (response) {
          navigator.clipboard.writeText(`${BaseUrl}/${response.token}`).then(() => {
            showSuccessToast({
              message: 'Link copiado para o clipboard!'
            })
          })
          history.push(pages.FUNNELS.INDEX)
        } else {
          showErrorToast({
            message: 'Favor corrigir os itens abaixo.'
          })
        }
      }
    } else {
      const customer = await editCustomer(values.get('id'), values)
      if (customer) {
        showSuccessToast({
          message: 'Informações salvas!'
        })
        history.push(pages.FUNNELS.INDEX)
      } else {
        showErrorToast({
          message: 'Favor corrigir os itens abaixo.'
        })
      }
    }
  }

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
          <Button onClick={submit} disabled={invalid}>
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
  initialize: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  profile: PropTypes.object.isRequired
}

export default reduxForm({
  form: formName
})(FunnelsForm)
