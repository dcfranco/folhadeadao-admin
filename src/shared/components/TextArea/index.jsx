import PropTypes from 'prop-types'
import React, { Fragment, forwardRef } from 'react'
import classNames from 'classnames'

const TextArea = forwardRef((props, ref) => {
  const {
    onChange,
    onBlur,
    name,
    id,
    disabled,
    className,
    placeholder,
    value,
    min,
    inputMode,
    onFocus,
    maxLength,
    tabIndex
  } = props


  return (
    <Fragment>
      <textarea
        id={id}
        disabled={disabled}
        name={name}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
        className={classNames(className, {
          'no-value': value === ''
        })}
        inputMode={inputMode}
        tabIndex={tabIndex}
        min={min}
        maxLength={maxLength}
        ref={ref}
      />
    </Fragment>
  )
})

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  min: PropTypes.number,
  maxLength: PropTypes.number,
  inputMode: PropTypes.string,
  tabIndex: PropTypes.number
}

TextArea.defaultProps = {
  onChange: null,
  onBlur: null,
  onFocus: null,
  value: '',
  placeholder: '',
  disabled: false,
  className: '',
  min: null,
  maxLength: null,
  inputMode: 'text',
  tabIndex: null
}

export default TextArea
