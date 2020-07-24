import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Container = ({ children, className, isWhiteBackground, autofocus }) => {
  const containerRef = useRef()

  useEffect(() => {
    if (autofocus) {
      setTimeout(() => {
        const { current: container } = containerRef
        if (container) {
          const input = container.querySelector('input, select')
          if (input) {
            input.focus()
          }
        }
      })
    }
  }, [])

  return (
    <div className='row' ref={containerRef}>
      <div className={classNames('border border-gray col-sm-12', className, {
        'bg-container': !isWhiteBackground,
        'bg-white': isWhiteBackground
      })}
      >
        { children }
      </div>
    </div>
  )
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isWhiteBackground: PropTypes.bool,
  autofocus: PropTypes.bool
}

Container.defaultProps = {
  className: 'p-4',
  isWhiteBackground: false,
  autofocus: false
}

export default React.memo(Container)
