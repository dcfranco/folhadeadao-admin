import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Action = ({ children, className, onClick }) => {
  return (
    <div
      className={classNames('sidepanel-action', className)}
      role='presentation'
      onClick={onClick}
    >
      { children }
    </div>
  )
}

Action.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired
}

Action.defaultProps = {
  className: ''
}

export default React.memo(Action)
