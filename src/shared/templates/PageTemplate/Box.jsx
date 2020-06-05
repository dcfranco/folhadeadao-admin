import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Box = ({ children, className, autofocus }) => {
  const boxRef = useRef()

  useEffect(() => {
    if (autofocus) {
      setTimeout(() => {
        const { current: container } = boxRef
        const input = container.querySelector('input, select')
        if (input) {
          input.focus()
        }
      })
    }
  }, [])

  return (
    <div
      ref={boxRef}
      className={classNames('bg-light border border-low-dark border-dotted', className)}
    >
      { children }
    </div>
  )
}

Box.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  autofocus: PropTypes.bool
}

Box.defaultProps = {
  className: 'p-3 bg-light',
  autofocus: false
}

export default React.memo(Box)
