import { salesFunnelCreateRequest } from 'admin/actions/sales-funnel'
import { Element, Row } from 'components/FormContent'
import CreateGenericConfirmModal from 'components/GenericConfirmModal'
import ReduxFormCheckbox from 'components/ReduxFormCheckbox'
import ReduxFormInput from 'components/ReduxFormInput'
import ReduxFormTextArea from 'components/ReduxFormTextArea'
import { ToastContext } from 'components/ToastProvider'
import { required } from 'form/validators'
import { bindPathParams } from 'helpers'
import PropTypes from 'prop-types'
import React, { useCallback, useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Field, Form, reduxForm } from 'redux-form/immutable'

const NewSalesFunnelModal = CreateGenericConfirmModal({
  cancelOnClose: true,
  title: 'Novo Funil',
  confirmBtnLabel: 'Cadastrar'
})

export const formName = 'sellersNewSalesFunnelModalForm'

const SellersNewSalesFunnelModal = ({
  isOpen,
  toggle,
  handleSubmit,
  submit,
  reset,
  invalid,
  pages,
  initialize
}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { showErrorToast, showSuccessToast } = useContext(ToastContext)
  useEffect(() => {
    if (isOpen) {
      initialize({
        description: '',
        isActive: false,
        createdAt: new Date().toISOString(),
        steps: 0
      })
    }
  }, [isOpen])

  const onCreate = useCallback((salesFunnelId) => {
    const route = bindPathParams({
      funnelId: salesFunnelId
    }, pages.FUNNELS.QUESTION.INDEX)
    history.push(route)
  }, [history])

  const onSubmit = useCallback((values) => {
    toggle()
    dispatch(salesFunnelCreateRequest(values)).then(async (response) => {
      if (response && response.id) {
        showSuccessToast({ message: 'Funil criado com sucesso, agora cadastre as perguntas' })
        setTimeout(() => onCreate(response.id))
        return
      }
      showErrorToast({ message: 'Ocorreu um problema ao criar o funil.' })
    })
  }, [onCreate, dispatch])

  const onClose = useCallback(() => {
    reset()
    toggle()
  }, [reset])

  return (
    <NewSalesFunnelModal
      isOpen={isOpen}
      canConfirm={!invalid}
      onConfirm={submit}
      onCancel={onClose}
    >
      Preencha os campos abaixo para continuar com a criação:
      <Form autoComplete='new-password' onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Element className='mt-2' lg='12'>
            <Field
              type='text'
              name='name'
              id='name'
              placeholder='Nome'
              component={ReduxFormInput}
              validate={[required]}
            />
          </Element>
        </Row>
        <Row>
          <Element lg='12'>
            <Field
              type='text'
              name='description'
              id='description'
              placeholder='Descrição'
              maxLength={255}
              component={ReduxFormTextArea}
              validate={[required]}
            />
          </Element>
        </Row>
        <Row>
          <Element lg='auto'>
            <Field
              name='isActive'
              label='Criar com status habilitado'
              id='isActive'
              noMargin={true}
              component={ReduxFormCheckbox}
            />
          </Element>
        </Row>
      </Form>
    </NewSalesFunnelModal>
  )
}

SellersNewSalesFunnelModal.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  pages: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
}

export default reduxForm({
  form: formName,
  forceUnregisterOnUnmount: true,
  keepDirtyOnReinitialize: false
})(SellersNewSalesFunnelModal)
