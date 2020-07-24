import React, { memo, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalHeader, ModalFooter, ModalBody } from 'components/Modal'
import classNames from 'classnames'

const defaultConfigs = {
  title: 'Confirmação',
  cancelOnClose: false,
  cancelBtnLabel: 'Cancelar',
  confirmBtnLabel: 'Confirmar',
  cancelBtnClassName: 'btn-light',
  confirmBtnClassName: 'btn-primary',
  autoFocus: true
}

const CreateGenericConfirmModal = (configs) => {
  const {
    title,
    cancelOnClose,
    cancelBtnLabel,
    confirmBtnLabel,
    cancelBtnClassName,
    confirmBtnClassName,
    autoFocus
  } = { ...defaultConfigs, ...configs }

  const cancelClassName = classNames('btn', cancelBtnClassName)
  const confirmClassName = classNames('btn', confirmBtnClassName)
  const GenericConfirmModal = memo(
    ({ isOpen, onClose, children, onConfirm, onCancel, canConfirm }) => {
      const onCloseAction = cancelOnClose ? onCancel : onClose
      const containerRef = useRef()

      useEffect(() => {
        if (isOpen && autoFocus) {
          setTimeout(() => {
            const { current: container } = containerRef
            const input = container.querySelector('input, select')
            if (input) {
              input.focus()
            }
          })
        }
      }, [isOpen])

      return (
        <Modal isOpen={isOpen} toggle={onCloseAction} centered={true} size='md'>
          <ModalHeader toggle={onCloseAction}>{title}</ModalHeader>
          <ModalBody><div ref={containerRef}>{children}</div></ModalBody>
          <ModalFooter>
            <button
              type='button'
              onClick={onCancel}
              className={cancelClassName}
            >
              {cancelBtnLabel}
            </button>
            <button
              type='button'
              disabled={!canConfirm}
              onClick={onConfirm}
              className={confirmClassName}
            >
              {confirmBtnLabel}
            </button>
          </ModalFooter>
        </Modal>
      )
    }
  )

  GenericConfirmModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    canConfirm: PropTypes.bool,
    onClose: PropTypes.func
  }

  GenericConfirmModal.defaultProps = {
    onClose: () => {},
    canConfirm: true
  }

  return GenericConfirmModal
}

export default CreateGenericConfirmModal
