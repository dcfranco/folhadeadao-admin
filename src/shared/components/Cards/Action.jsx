import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Action = ({ children, className }) => {
  return (
    <div className={classNames('ml-auto mr-1', className)}>
      { children }
    </div>
  )
}

Action.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

Action.defaultProps = {
  className: ''
}

export default Action
