import React, { Fragment, useEffect, useContext, useRef, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Field, Form, reduxForm } from 'redux-form/immutable'
import { ColumnWrapper, ColumnLeft, ColumnRight, Container } from 'templates/PageTemplate'
import UserInfo from 'components/UserInfo'
import FormContent, { Row, Element } from 'components/FormContent'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { sellerCreateRequest, sellerAsyncRequest, sellerResetSelected,
  sellerEditRequest } from 'admin/actions/sellers'
import { Map } from 'immutable'

import { ToastContext } from 'components/ToastProvider'
import Button from 'components/Button'
import ReduxFormSelect from 'components/ReduxFormSelect'
import ReduxFormInput from 'components/ReduxFormInput'
import { required, cpfValidator, dateRequired } from 'form/validators'
import { dateNormalizer, numbersNormalizer,
  cpfNormalizer } from 'form/normalizers'

export const formName = 'newEditSellerForm'

const SellersForm = (
  { handleSubmit, submit, pristine, invalid, initialize, profile: { pages } }
) => {
  const [isEditMode, toggleEditMode] = useState(false)
  const { showErrorToast, showSuccessToast } = useContext(ToastContext)
  const { sellerId } = useParams()
  const seller = useSelector(({ admin }) => admin.sellers.getIn(['options', 'selected']))

  const history = useHistory()
  const dispatch = useDispatch()

  const personalDataRef = useRef()

  const sellerNotFound = useCallback(() => {
    showErrorToast({
      message: 'Representante não encontrado!'
    })
    history.push(pages.SELLERS.INDEX)
  }, [])

  useEffect(() => () => {
    toggleEditMode(false)
    dispatch(sellerResetSelected())
  }, [])

  const onCancel = useCallback(() => {
    history.goBack()
  }, [])

  useEffect(() => {
    if (sellerId) {
      if (!seller) {
        dispatch(sellerAsyncRequest(sellerId)).then((response) => {
          if (!response) {
            sellerNotFound()
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
  }, [sellerId])

  useEffect(() => {
    if (isEditMode && seller) {
      initialize(new Map({
        firstName: seller.getIn(['user', 'firstName']),
        lastName: seller.getIn(['user', 'lastName']),
        email: seller.getIn(['user', 'email']),
        username: seller.getIn(['user', 'username']),
        isBlocked: seller.getIn(['user', 'isBlocked']),
        isAdmin: seller.getIn(['user', 'isAdmin'])
      }))
      setTimeout(() => {
        const { current: personalData } = personalDataRef
        const input = personalData.querySelector('input')
        if (input) {
          input.focus()
        }
      })
    }
  }, [isEditMode, seller])

  const onSubmit = useCallback(async (values) => {
    if (!sellerId) {
      const response = await dispatch(sellerCreateRequest(values))
      if (response) {
        showSuccessToast({
          message: 'Representante criado com sucesso!'
        })
      } else {
        showErrorToast({
          message: 'Favor corrigir os itens abaixo.'
        })
      }
    } else {
      const response = await dispatch(sellerEditRequest(sellerId, values))
      if (response) {
        showSuccessToast({
          message: 'Representante alterado com sucesso!'
        })
      } else {
        showErrorToast({
          message: 'Favor corrigir os itens abaixo.'
        })
      }
    }
  }, [sellerId])

  return (
    <Fragment>
      <ColumnWrapper>
        <ColumnLeft>
          <UserInfo
            className='font-size-xl'
            avatarClassName='text-dark border-dark'
            infoClassName='font-weight-lighter text-low-dark'
            fullName={isEditMode ? seller.getFullName() : 'Novo Representante'}
          >
            { isEditMode && (`CPF: ${seller.getIn(['user', 'cpf'])}`) }
          </UserInfo>
        </ColumnLeft>
        <ColumnRight isActionBar={true}>
          <Button className='btn btn-default mr-3' onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={() => submit()} disabled={invalid || (isEditMode && pristine)}>
            Salvar
          </Button>
        </ColumnRight>
      </ColumnWrapper>
      <Container isWhiteBackground={true} autofocus={true}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormContent title='Dados pessoais' ref={personalDataRef}>
            <Row>
              <Element lg='6'>
                <Field
                  type='text'
                  name='nome'
                  label='Nome: *'
                  id='nome'
                  placeholder='Nome'
                  component={ReduxFormInput}
                  validate={[required]}
                />
              </Element>
              <Element lg='6'>
                <Field
                  type='text'
                  name='sobrenome'
                  label='Sobrenome: *'
                  id='sobrenome'
                  placeholder='Sobrenome'
                  component={ReduxFormInput}
                  validate={[required]}
                />
              </Element>
            </Row>
            <Row>
              <Element lg='4'>
                <Field
                  type='text'
                  name='nascimento'
                  label='Data de Nascimento: *'
                  id='nascimento'
                  placeholder='Data de Nascimento'
                  component={ReduxFormInput}
                  validate={[dateRequired]}
                  normalize={dateNormalizer}
                />
              </Element>
              <Element lg='4'>
                <Field
                  name='sexo'
                  label='Sexo: *'
                  id='sexo'
                  placeholder='Sexo'
                  options={[
                    { value: 'M', label: 'Masculino' },
                    { value: 'F', label: 'Feminino' }
                  ]}
                  component={ReduxFormSelect}
                  validate={[required]}
                />
              </Element>
              <Element lg='4'>
                <Field
                  type='text'
                  name='dependentes'
                  label='Número de dependentes: *'
                  id='dependentes'
                  placeholder='Número de dependentes'
                  component={ReduxFormInput}
                  validate={[required]}
                  normalize={numbersNormalizer}
                />
              </Element>
            </Row>
            <Row>
              <Element lg='4'>
                <Field
                  type='text'
                  name='cpf'
                  label='CPF: *'
                  id='cpf'
                  placeholder='CPF'
                  component={ReduxFormInput}
                  validate={[required, cpfValidator]}
                  normalize={cpfNormalizer}
                />
              </Element>
              <Element lg='4'>
                <Field
                  type='text'
                  name='nome_mae'
                  label='Nome da mãe: *'
                  id='nome_mae'
                  placeholder='Nome da mãe'
                  component={ReduxFormInput}
                  validate={[required]}
                />
              </Element>
              <Element lg='4'>
                <Field
                  name='estado_civil'
                  label='Estado Civil: *'
                  id='estado_civil'
                  placeholder='Estado Civil'
                  component={ReduxFormSelect}
                  options={[]}
                />
              </Element>
            </Row>
          </FormContent>
        </Form>
      </Container>
    </Fragment>
  )
}

SellersForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired
}

export default reduxForm({
  form: formName
})(SellersForm)
