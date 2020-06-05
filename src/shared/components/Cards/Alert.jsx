import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Alert = ({ children, className, type }) => {
  return (
    <div className={classNames('ml-auto mr-1', className)}>
      <span className={`font-size-sm text-${type}`}>{ children }</span>
    </div>
  )
}

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf(['warning', 'success', 'danger', 'dark', 'info'])
}

Alert.defaultProps = {
  className: '',
  type: 'success'
}

export default Alert
