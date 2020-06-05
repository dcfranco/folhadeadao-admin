import React, {
  forwardRef,
  useState,
  useCallback,
  useImperativeHandle,
  Fragment,
  useEffect,
  useRef,
  memo
} from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

import { useWindowSize } from 'hooks'

const dropdownRoot = document.getElementById('dropdown-root')

const Dropdown = memo(forwardRef(({ children, className }, ref) => {
  const [position, setPosition] = useState({ y: 0, x: 0 })
  const [isVisible, toggleDropdown] = useState(false)
  const [parent, setParent] = useState(null)
  const dropdownRef = useRef()
  const size = useWindowSize()

  useEffect(() => {
    if (parent) {
      const hoverRect = parent.getBoundingClientRect()
      const { current: dropdownElement } = dropdownRef

      if (hoverRect !== null && dropdownElement !== null) {
        let x = 0
        let y = 0

        const docHeight = document.documentElement.clientHeight

        const lx = hoverRect.x
        const ty = hoverRect.y
        const by = hoverRect.y + hoverRect.height

        const ttRect = dropdownElement.getBoundingClientRect()

        const bAbove = (ty - ttRect.height) >= 0
        const bBellow = (by + ttRect.height) <= (window.scrollY + docHeight)

        if (bBellow) {
          y = by
          x = lx + (hoverRect.width - ttRect.width)

          if (x < 0) {
            x = lx
          }
        } else if (bAbove) {
          y = ty - ttRect.height
          x = lx + (hoverRect.width - ttRect.width)

          if (x < 0) {
            x = lx
          }
        }

        setPosition({ x, y })
      }
    }
  }, [parent])

  const hide = useCallback(() => {
    if (isVisible) {
      toggleDropdown(false)
      setParent(null)
    }
  }, [isVisible, toggleDropdown])

  const show = useCallback((element) => {
    if (isVisible) {
      setParent(null)
      toggleDropdown(false)
    } else {
      setParent(element.currentTarget)
      setTimeout(() => toggleDropdown(true))
    }
  }, [setParent, isVisible, toggleDropdown])

  useImperativeHandle(ref, () => ({
    show,
    hide
  }))

  useEffect(() => hide(), [size])

  const isModal = ['XS'].includes(size)
  const style = {
    left: (`${(position.x + window.scrollX)}px`),
    top: (`${(position.y + window.scrollY)}px`)
  }

  const dropdown = (
    <Fragment>
      <div
        className={classNames('dropdown', className, {
          'is-visible': isVisible,
          'is-modal': isModal
        })}
        style={!isModal ? style : {}}
        ref={dropdownRef}
      >
        <div className='dropdown-content'>
          { children }
        </div>
        { isModal && (
          <div
            onClick={() => hide()}
            className='dropdown-modal-close'
          >
            Cancelar
          </div>
        )}
      </div>
      <div
        className={classNames('dropdown-overlay', {
          'is-visible': isVisible,
          'is-modal': isModal
        })}
        onClick={() => hide()}
      />
    </Fragment>
  )

  return ReactDOM.createPortal(dropdown, dropdownRoot)
}))

Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

Dropdown.defaultProps = {
  className: ''
}

export { default as DropdownAction } from './Action'
export { default as DropdownHeader } from './Header'

export default Dropdown
