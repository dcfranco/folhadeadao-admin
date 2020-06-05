import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Action = ({ children, className, onClick, icon: Icon }) => {
  return (
    <div
      onClick={onClick}
      className={classNames('dropdown-action', className)}
    >
      { Icon && (
        <div className='icon-box'>
          <Icon />
        </div>
      ) }
      { children }
    </div>
  )
}

Action.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  icon: PropTypes.any
}

Action.defaultProps = {
  icon: null,
  className: ''
}

export default React.memo(Action)
