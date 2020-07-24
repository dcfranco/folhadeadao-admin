import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Action = ({ children, className }) => {
  return (
    <div
      className={classNames('sidepanel-actions', className)}
    >
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

export default React.memo(Action)
