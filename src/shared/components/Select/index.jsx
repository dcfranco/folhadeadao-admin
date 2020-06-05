import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

const Select = (props) => {
  const {
    onChange,
    onBlur,
    name,
    id,
    disabled,
    className,
    placeholder,
    value,
    options,
    defaultValue
  } = props

  return (
    <select
      id={id}
      disabled={disabled}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      placeholder={placeholder}
      autoComplete='true'
      className={classNames(className, {
        'no-value': defaultValue && value === ''
      })}
    >
      { defaultValue && (
        <option value=''>{ placeholder || 'Selecione' }</option>
      )}
      { options.map((option) => (
        <option key={option.value} value={option.value}>{ option.label }</option>
      )) }
    </select>
  )
}

Select.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,
  defaultValue: PropTypes.bool
}

Select.defaultProps = {
  onChange: null,
  onBlur: null,
  value: '',
  placeholder: '',
  disabled: false,
  className: '',
  defaultValue: true
}

export default Select
