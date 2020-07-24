import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import { useSelector } from 'react-redux'
import TextArea from 'components/TextArea'
import InputError from 'components/InputError'

const ReduxFormTextArea = forwardRef((props, ref) => {
  const {
    input,
    meta,
    id,
    label,
    disabled,
    className,
    hideError,
    errorText,
    placeholder,
    formClassName,
    labelClassName,
    inputMode,
    min,
    isDetailError,
    noMargin,
    maxLength
  } = props

  const { touched, error } = meta
  const errors = useSelector(state => state.errors)

  const currentErrorText = errors.getFieldError(input.name, isDetailError) || errorText

  const inputClassName = classNames('form-control', {
    'is-invalid': (touched && error) || currentErrorText
  })

  const labelClass = classNames(labelClassName, {
    'text-danger': (touched && error) || currentErrorText,
    'sr-only': !label
  }, 'd-block text-truncate')

  const formGroupClassName = classNames('form-group', formClassName, {
    'mb-0': noMargin
  })

  return (
    <div className={formGroupClassName}>
      {/* eslint-disable-next-line jsx-a11y/label-has-for */}
      <label htmlFor={input.name} className={labelClass}>{label}</label>
      <TextArea
        id={id || input.name}
        disabled={disabled}
        name={input.name}
        onChange={input.onChange}
        onFocus={input.onFocus}
        onBlur={input.onBlur}
        value={input.value}
        placeholder={placeholder}
        inputMode={inputMode}
        className={classNames(inputClassName, className)}
        min={min}
        maxLength={maxLength}
        ref={ref}
      />
      {!hideError && (
        <InputError
          touched={touched || currentErrorText}
          error={error || currentErrorText}
        />
      )}
    </div>
  )
})

ReduxFormTextArea.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  hideError: PropTypes.bool,
  errorText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  inputMode: PropTypes.string,
  formClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  min: PropTypes.number,
  isDetailError: PropTypes.bool,
  noMargin: PropTypes.bool,
  maxLength: PropTypes.number
}

ReduxFormTextArea.defaultProps = {
  input: {},
  meta: {},
  placeholder: '',
  disabled: false,
  className: '',
  hideError: false,
  errorText: null,
  label: null,
  formClassName: '',
  labelClassName: '',
  inputMode: 'text',
  id: null,
  min: null,
  isDetailError: false,
  noMargin: false,
  maxLength: null
}

export default ReduxFormTextArea
