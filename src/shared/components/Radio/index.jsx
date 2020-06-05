import PropTypes from 'prop-types'
import React from 'react'

const Radio = (props) => {
  const {
    onChange,
    onBlur,
    name,
    id,
    disabled,
    className,
    placeholder,
    value
  } = props

  return (
    <input
      type='radio'
      id={id}
      disabled={disabled}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      placeholder={placeholder}
      className={className}
    />
  )
}

Radio.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string
}

Radio.defaultProps = {
  onChange: null,
  onBlur: null,
  value: '',
  placeholder: '',
  disabled: false,
  className: ''
}

export default Radio
