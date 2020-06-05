import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Content = ({ children, className, isWhiteBackground }) => {
  return (
    <div
      className={classNames(className, {
        'bg-container-light p-4': !isWhiteBackground,
        'white-background': isWhiteBackground
      })}
    >
      { children }
    </div>
  )
}

Content.propTypes = {
  children: PropTypes.node.isRequired,
  isWhiteBackground: PropTypes.bool,
  className: PropTypes.string
}

Content.defaultProps = {
  className: '',
  isWhiteBackground: false
}

export default Content
