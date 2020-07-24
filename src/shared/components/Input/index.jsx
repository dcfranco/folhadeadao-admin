import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import classNames from 'classnames'

const Input = React.forwardRef((props, ref) => {
  const {
    onChange,
    onBlur,
    onKeyPress,
    name,
    id,
    disabled,
    className,
    placeholder,
    type,
    value,
    checked,
    inputMode,
    tabIndex,
    min,
    onKeyDown,
    onPaste,
    maxLength,
    autoComplete
  } = props

  return (
    <Fragment>
      <input
        autoComplete={autoComplete}
        type={type}
        id={id}
        disabled={disabled}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        onKeyPress={onKeyPress}
        onKeyDown={onKeyDown}
        onPaste={onPaste}
        value={value}
        placeholder={placeholder}
        className={classNames(className, {
          'no-value': value === ''
        })}
        checked={checked}
        inputMode={inputMode}
        tabIndex={tabIndex}
        min={min}
        ref={ref}
        maxLength={maxLength}
      />
    </Fragment>
  )
})

Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyPress: PropTypes.func,
  onKeyDown: PropTypes.func,
  onPaste: PropTypes.func,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.string,
  checked: PropTypes.any,
  inputMode: PropTypes.string,
  autoComplete: PropTypes.string,
  tabIndex: PropTypes.number,
  min: PropTypes.number,
  maxLength: PropTypes.number
}

Input.defaultProps = {
  onChange: null,
  onBlur: null,
  value: '',
  placeholder: '',
  disabled: false,
  className: '',
  type: 'text',
  checked: false,
  inputMode: 'text',
  tabIndex: null,
  onKeyPress: null,
  autoComplete: 'true',
  min: null,
  onKeyDown: null,
  onPaste: null,
  maxLength: null
}

export default Input
