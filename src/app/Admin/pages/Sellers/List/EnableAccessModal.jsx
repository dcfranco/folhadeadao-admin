import React, { useCallback, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Field, Form, reduxForm } from 'redux-form/immutable'
import CreateGenericConfirmModal from 'components/GenericConfirmModal'
import { Row, Element } from 'components/FormContent'
import ReduxFormInput from 'components/ReduxFormInput'
import { sellersAsyncRequest, sellerCreateRequest } from 'admin/actions/sellers'
import { required, username } from 'form/validators'
import ReduxFormCheckbox from 'components/ReduxFormCheckbox'
import { ToastContext } from 'components/ToastProvider'

const EnableAccessModal = CreateGenericConfirmModal({
  cancelOnClose: true,
  title: 'Liberação de acesso'
})

const generateUsername = (name = '') => {
  const usname = []

  if (!Number.isNaN(Number.parseInt(name.charAt(0), 10))) {
    usname.push(name.substr(5, 2))
  } else {
    usname.push(name.substr(0, 2))
  }

  if (name.lastIndexOf(' ') >= 0) {
    usname.push(name.substr(name.lastIndexOf(' ') + 1, 6))
  } else {
    usname.push(name.substr(2, 6))
  }

  return usname.join('').toLocaleLowerCase()
}
export const formName = 'sellersEnableAccessModalForm'

const SellersEnableAccessModal = ({
  seller,
  toggle,
  handleSubmit,
  submit,
  reset,
  invalid,
  initialize
}) => {
  const dispatch = useDispatch()
  const { showErrorToast, showSuccessToast } = useContext(ToastContext)
  const isBlocked = seller && seller.getIn(['user', 'isBlocked'])
  useEffect(() => {
    if (seller) {
      initialize({
        username: isBlocked ? seller.getIn(['user', 'username']) : generateUsername(seller.get('name')),
        isAdmin: isBlocked ? seller.getIn(['user', 'isAdmin']) : false,
        isBlocked: false
      })
    }
  }, [seller])

  const onSubmit = useCallback(
    (values) => {
      toggle()()
      dispatch(sellerCreateRequest(seller.get('ID'), values)).then(async (response) => {
        if (response && response.id) {
          await dispatch(sellersAsyncRequest(true))
          showSuccessToast({ message: 'A liberação foi efetuada com sucesso!' })
          return
        }
        showErrorToast({ message: 'Ocorreu um problema ao efetuar a liberação.' })
      })
    },
    [seller, dispatch]
  )

  const onClose = useCallback(
    (e) => {
      reset()
      toggle()(e)
    },
    [reset]
  )

  return (
    <EnableAccessModal
      isOpen={!!seller}
      canConfirm={!invalid}
      onConfirm={submit}
      onCancel={onClose}
    >
      O usuário será criado com a senha padrão <strong>Trocar123</strong>
      <Form autoComplete='new-password' onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Element className='mt-2' lg='12'>
            <Field
              type='text'
              name='username'
              id='username'
              placeholder='Usuário de acesso'
              maxLength={8}
              disabled={isBlocked}
              component={ReduxFormInput}
              validate={[required, username]}
            />
          </Element>
        </Row>
        <Row>
          <Element lg='auto'>
            <Field
              name='isAdmin'
              label='Administrador'
              id='isAdmin'
              noMargin={true}
              component={ReduxFormCheckbox}
            />
          </Element>
          {!isBlocked && (
            <Element lg='auto'>
              <Field
                name='isBlocked'
                label='Bloqueado'
                noMargin={true}
                id='isBlocked'
                component={ReduxFormCheckbox}
              />
            </Element>
          )}
        </Row>
      </Form>
    </EnableAccessModal>
  )
}

SellersEnableAccessModal.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  seller: PropTypes.any
}

SellersEnableAccessModal.defaultProps = {
  seller: false
}

export default reduxForm({
  form: formName,
  forceUnregisterOnUnmount: true,
  keepDirtyOnReinitialize: false
})(SellersEnableAccessModal)
