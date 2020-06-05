import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalHeader, ModalFooter, ModalBody } from 'components/Modal'
import classNames from 'classnames'

const defaultConfigs = {
  title: 'Confirmação',
  cancelOnClose: false,
  cancelBtnLabel: 'Cancelar',
  confirmBtnLabel: 'Confirmar',
  cancelBtnClassName: 'btn-light',
  confirmBtnClassName: 'btn-primary'
}

const CreateGenericConfirmModal = (configs) => {
  const { title, cancelOnClose,
    cancelBtnLabel, confirmBtnLabel,
    cancelBtnClassName, confirmBtnClassName } = { ...defaultConfigs, ...configs }

  const cancelClassName = classNames('btn', cancelBtnClassName)
  const confirmClassName = classNames('btn', confirmBtnClassName)
  const GenericConfirmModal = memo(({ isOpen, onClose, children, onConfirm, onCancel }) => {
    const onCloseAction = cancelOnClose ? onCancel : onClose
    return (
      <Modal isOpen={isOpen} toggle={onCloseAction} centered={true} size='md'>
        <ModalHeader toggle={onCloseAction}>
          { title }
        </ModalHeader>
        <ModalBody>
          { children }
        </ModalBody>
        <ModalFooter>
          <button type='button' onClick={onCancel} className={cancelClassName}>{ cancelBtnLabel }</button>
          <button type='button' onClick={onConfirm} className={confirmClassName}>{ confirmBtnLabel }</button>
        </ModalFooter>
      </Modal>
    )
  })

  GenericConfirmModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func
  }

  GenericConfirmModal.defaultProps = {
    onClose: () => {}
  }

  return GenericConfirmModal
}

export default CreateGenericConfirmModal
