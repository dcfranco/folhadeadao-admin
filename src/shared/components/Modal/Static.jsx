import React, { Fragment, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { throttle } from 'lodash'
import Helper from 'helpers'
import { Modal } from '.'

const ModalStatic = ({ children, className, wrapperClassName, size, isOpen, toggle }) => {
  const classSize = `modal-${size}`
  const wrapperRef = useRef(null)

  const [position, setPosition] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const [canShow, setCanShow] = useState(false)

  const updateModalPosition = throttle(() => {
    const { current: modalElement } = wrapperRef
    const bodyWidth = document.body.offsetWidth
    const newIsMobile = Helper.isSmallDevice()
    setIsMobile(newIsMobile)

    if (modalElement) {
      const wrapperBound = modalElement.getBoundingClientRect()

      if (wrapperBound.x < 10 && position !== 'position-absolute-left') {
        setPosition('position-absolute-left')
      } else if ((wrapperBound.x + wrapperBound.width) > bodyWidth && position !== 'position-absolute-right') {
        setPosition('position-absolute-right')
      }
    }
  }, 100)

  useEffect(() => {
    updateModalPosition()
    window.addEventListener('resize', updateModalPosition)
    return () => {
      window.removeEventListener('resize', updateModalPosition)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      updateModalPosition()
    }
    setTimeout(() => setCanShow(isOpen))
  }, [isOpen])

  if (isMobile && isOpen) {
    return (
      <Modal
        isOpen={canShow}
        size={size}
        toggle={toggle}
        centered={true}
      >
        { children }
      </Modal>
    )
  }

  if (!isMobile && isOpen) {
    return (
      <Fragment>
        { (isOpen && toggle && (<div className='modal-backdrop bg-transparent' role='presentation' onClick={toggle} />)) }
        <div
          ref={wrapperRef}
          className={classNames('modal-dialog vw-100 static-modal position-absolute', classSize, position, wrapperClassName, {
            'visible': canShow,
            'invisible': !canShow
          })}
        >
          <div className={classNames('modal-content', className)}>
            { children }
          </div>
        </div>
      </Fragment>
    )
  }

  return null
}

ModalStatic.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
  toggle: PropTypes.func,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl'])
}

ModalStatic.defaultProps = {
  toggle: () => {},
  className: '',
  wrapperClassName: '',
  size: 'md'
}

export default React.memo(ModalStatic)
