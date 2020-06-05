import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

const Badge = (props) => {
  const {
    type,
    className,
    children,
    onClick
  } = props

  return (
    <span
      onClick={onClick}
      className={classNames('border font-size-xs font-weight-bold rounded text-uppercase text-truncate p-2', {
        'border-secondary text-secondary': type === 'default',
        [`border-${type} text-${type}`]: type !== 'default'
      }, className)}
    >
      { children }
    </span>
  )
}

Badge.propTypes = {
  type: PropTypes.oneOf(['default', 'primary', 'warning', 'danger']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
}

Badge.defaultProps = {
  type: 'default',
  className: '',
  onClick: () => {}
}

export default React.memo(Badge)
