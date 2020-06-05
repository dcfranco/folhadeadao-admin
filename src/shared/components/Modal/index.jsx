import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal as MainModal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap'

class Modal extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool.isRequired,
    centered: PropTypes.bool,
    size: PropTypes.string,
    toggle: PropTypes.func,
    className: PropTypes.string,
    backdrop: PropTypes.bool,
    fade: PropTypes.bool
  }

  static defaultProps = {
    centered: false,
    backdrop: true,
    fade: true,
    size: '',
    className: '',
    toggle: () => {}
  }

  render() {
    const { children, toggle, isOpen, centered,
      fade, backdrop, size, className } = this.props
    return (
      <MainModal
        className={className}
        isOpen={isOpen}
        toggle={toggle}
        centered={centered}
        fade={fade}
        backdrop={backdrop}
        size={size}
        zIndex={2000}
      >
        { children }
      </MainModal>
    )
  }
}

export {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
}
