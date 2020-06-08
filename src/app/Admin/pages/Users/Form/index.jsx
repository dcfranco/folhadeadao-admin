import React, { Fragment, useEffect, useContext, useRef, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Field, Form, reduxForm } from 'redux-form/immutable'
import { ColumnWrapper, ColumnLeft, ColumnRight, Container } from 'templates/PageTemplate'
import UserInfo from 'components/UserInfo'
import FormContent, { Row, Element } from 'components/FormContent'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { userCreateRequest, userAsyncRequest, userResetSelected,
  userEditRequest } from 'admin/actions/users'
import { sellerCreateRequest, sellerDeleteRequest } from 'admin/actions/sellers'
import { Map } from 'immutable'
import UsersFactory from 'factories/Users'
import moment from 'moment'

import { ToastContext } from 'components/ToastProvider'
import Button from 'components/Button'
import ReduxFormSelect from 'components/ReduxFormSelect'
import ReduxFormInput from 'components/ReduxFormInput'
import ReduxFormCheckbox from 'components/ReduxFormCheckbox'

import { required, cpfValidator, dateRequired, email } from 'form/validators'
import { dateNormalizer, cpfNormalizer } from 'form/normalizers'

export const formName = 'newEditUserForm'

const UsersForm = (
  { handleSubmit, submit, pristine, reset, invalid, initialize, profile: { pages } }
) => {
  const [isEditMode, toggleEditMode] = useState(false)
  const { showErrorToast, showSuccessToast } = useContext(ToastContext)
  const { userId } = useParams()
  const user = useSelector(({ admin }) => admin.users.getIn(['options', 'selected']))
  const history = useHistory()
  const dispatch = useDispatch()

  const personalDataRef = useRef()
  const initialUserValues = useRef()

  const userNotFound = useCallback(() => {
    showErrorToast({
      message: 'Usuário não encontrado!'
    })
    history.push(pages.USERS.INDEX)
  }, [])

  useEffect(() => () => {
    toggleEditMode(false)
    dispatch(userResetSelected())
  }, [])

  const onCancel = useCallback(() => {
    history.goBack()
  }, [])

  useEffect(() => {
    if (userId) {
      if (!user) {
        dispatch(userAsyncRequest(userId)).then((response) => {
          if (!response) {
            userNotFound()
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
  }, [userId])

  const setFocus = () => setTimeout(() => {
    const { current: personalData } = personalDataRef
    const input = personalData.querySelector('input')
    if (input) {
      input.focus()
    }
  })

  useEffect(() => {
    if (isEditMode && user) {
      initialUserValues.current = user
      initialize(new Map({
        firstName: user.get('firstName'),
        lastName: user.get('lastName'),
        email: user.get('email'),
        username: user.get('username'),
        birthday: user.getFormatedDate('birthday'),
        cpf: user.get('cpf'),
        genre: user.get('genre'),
        isBlocked: user.get('isBlocked'),
        isAdmin: user.get('isAdmin'),
        isSeller: user.get('isSeller')
      }))
    } else if (!isEditMode) {
      initialize(new Map({
        isBlocked: false,
        isAdmin: false,
        isSeller: false
      }))
    }
    setFocus()
  }, [isEditMode, user])

  const createSeller = useCallback(async (id) => {
    return dispatch(sellerCreateRequest({
      userId: parseInt(id, 10),
      createdAt: moment().toISOString()
    }))
  }, [])

  const onSubmit = useCallback(async (values) => {
    if (!userId) {
      const request = UsersFactory.createRequest(values)
      const response = await dispatch(userCreateRequest(request))
      if (response) {
        if (values.get('isSeller')) {
          const { id } = response
          const sellerResponse = await createSeller(id)
          if (sellerResponse) {
            showSuccessToast({
              message: 'Representante criado com sucesso!'
            })
          } else {
            showSuccessToast({
              message: 'Usuário criado com sucesso mas ocorreu um problema ao criá-lo como representante!'
            })
          }
        } else {
          showSuccessToast({
            message: 'Usuário criado com sucesso!'
          })
        }
        setTimeout(() => {
          reset()
          setFocus()
        })
      } else {
        showErrorToast({
          message: 'Favor corrigir os itens abaixo.'
        })
      }
    } else {
      const { current: initialUser } = initialUserValues

      if (initialUser.get('isSeller') && !values.get('isSeller')) {
        await dispatch(sellerDeleteRequest(initialUser.getIn(['seller', 'id'])))
      } else if (!initialUser.get('isSeller') && values.get('isSeller')) {
        await createSeller(userId)
      }

      const request = UsersFactory.editRequest(values)
      const response = await dispatch(userEditRequest(userId, request))
      if (response) {
        showSuccessToast({
          message: 'Usuário alterado com sucesso!'
        })
      } else {
        showErrorToast({
          message: 'Favor corrigir os itens abaixo.'
        })
      }
    }
  }, [userId, initialUserValues])

  return (
    <Fragment>
      <ColumnWrapper>
        <ColumnLeft>
          <UserInfo
            className='font-size-xl'
            avatarClassName='text-dark border-dark'
            infoClassName='font-weight-lighter text-low-dark'
            fullName={isEditMode ? user.getFullName() : 'Novo Usuário'}
          >
            { isEditMode && (`CPF: ${user.get('cpf')}`) }
          </UserInfo>
        </ColumnLeft>
        <ColumnRight isActionBar={true}>
          <Button className='btn btn-default mr-3' onClick={onCancel}>
            Voltar
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
                  name='firstName'
                  label='Nome: *'
                  id='firstName'
                  placeholder='Nome'
                  component={ReduxFormInput}
                  validate={[required]}
                />
              </Element>
              <Element lg='6'>
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
            </Row>
            <Row>
              <Element lg='4'>
                <Field
                  type='text'
                  name='birthday'
                  label='Data de Nascimento: *'
                  id='birthday'
                  placeholder='Data de Nascimento'
                  component={ReduxFormInput}
                  validate={[dateRequired]}
                  normalize={dateNormalizer}
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
            </Row>
            <Row>
              <Element lg='4'>
                <Field
                  type='text'
                  name='username'
                  label='Usuário: *'
                  id='username'
                  placeholder='Usuário'
                  component={ReduxFormInput}
                  validate={[required]}
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
            <Row>
              <Element lg='auto'>
                <Field
                  name='isAdmin'
                  label='Administrador'
                  id='isAdmin'
                  component={ReduxFormCheckbox}
                />
              </Element>
              <Element lg='auto'>
                <Field
                  name='isBlocked'
                  label='Bloqueado'
                  id='isBlocked'
                  component={ReduxFormCheckbox}
                />
              </Element>
              <Element lg='auto'>
                <Field
                  name='isSeller'
                  label='Representante'
                  id='isSeller'
                  component={ReduxFormCheckbox}
                />
              </Element>
            </Row>
            { !isEditMode && (
              <Row>
                <Element lg='12'>
                  <p className='mt-3'><strong>** Usuário será criado com a senha padrão <span className='text-primary'>FolhaAdao123</span> **</strong></p>
                </Element>
              </Row>
            )}
          </FormContent>
        </Form>
      </Container>
    </Fragment>
  )
}

UsersForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired
}

export default reduxForm({
  form: formName
})(UsersForm)
