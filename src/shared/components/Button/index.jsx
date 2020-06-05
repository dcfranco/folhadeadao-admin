import PropTypes from 'prop-types'
import React from 'react'

const Button = (props) => {
  const {
    type,
    className,
    disabled,
    children,
    onClick
  } = props

  return (
    <button
      type={type}
      disabled={disabled}
      className={className}
      onClick={onClick}
    >
      { children }
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
}

Button.defaultProps = {
  type: 'submit',
  disabled: false,
  className: 'btn btn-primary',
  onClick: () => {}
}

export default Button
