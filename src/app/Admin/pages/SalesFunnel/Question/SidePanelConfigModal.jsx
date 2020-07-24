import { Element, Row } from 'components/FormContent'
import CreateGenericConfirmModal from 'components/GenericConfirmModal'
import ReduxFormCheckbox from 'components/ReduxFormCheckbox'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Field, Form, reduxForm } from 'redux-form/immutable'

const SidePanelConfigModal = CreateGenericConfirmModal({
  cancelOnClose: true,
  title: 'Configurações',
  confirmBtnLabel: 'Salvar'
})

export const formName = 'questionsSidePanelConfigsModals'

const QuestionsSidePanelConfigModal = ({
  isOpen,
  onSave,
  onCancel,
  handleSubmit,
  submit,
  reset,
  invalid,
  initialize
}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (isOpen) {
      initialize({
        showOnlyActives: false
      })
    }
  }, [isOpen])

  const onSubmit = useCallback((values) => {
    onSave(values)
  }, [dispatch])

  const onClose = useCallback(() => {
    reset()
    onCancel()
  }, [reset])

  return (
    <SidePanelConfigModal
      isOpen={isOpen}
      canConfirm={!invalid}
      onConfirm={submit}
      onCancel={onClose}
    >
      <Form autoComplete='new-password' onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Element lg='auto'>
            <Field
              name='showOnlyActives'
              label='Mostrar somente etapas ativas'
              id='showOnlyActives'
              noMargin={true}
              component={ReduxFormCheckbox}
            />
          </Element>
        </Row>
      </Form>
    </SidePanelConfigModal>
  )
}

QuestionsSidePanelConfigModal.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
}

export default reduxForm({
  form: formName
})(QuestionsSidePanelConfigModal)
