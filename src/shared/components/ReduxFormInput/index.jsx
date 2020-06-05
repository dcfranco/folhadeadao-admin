import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import { useSelector } from 'react-redux'
import Input from 'components/Input'
import InputError from 'components/InputError'

const ReduxFormInput = forwardRef((props, ref) => {
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
    type,
    formClassName,
    labelClassName,
    inputMode,
    addonText,
    addonDirection,
    addonFunction,
    addonOnClick,
    onKeyPress,
    onKeyDown,
    onPaste,
    inputGroupClassName,
    addonClassName,
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
      <div className={classNames('input-group', inputGroupClassName)}>
        {
          addonText && addonDirection === 'left' && (
            <div className='input-group-prepend' onClick={addonOnClick}>
              { addonFunction && addonFunction() }
              {
                addonText && (
                  <span className='input-group-text'>{addonText()}</span>
                )
              }
            </div>
          )
        }
        <Input
          type={type}
          id={id || input.name}
          disabled={disabled}
          name={input.name}
          onChange={input.onChange}
          onFocus={input.onFocus}
          onBlur={input.onBlur}
          onKeyPress={onKeyPress}
          onKeyDown={onKeyDown}
          onPaste={onPaste}
          value={input.value}
          placeholder={placeholder}
          inputMode={inputMode}
          className={classNames(inputClassName, className)}
          min={min}
          maxLength={maxLength}
          ref={ref}
        />
        {
          (addonText || addonFunction) && addonDirection === 'right' && (
            <div className='input-group-append' onClick={addonOnClick}>
              { addonFunction && addonFunction() }
              {
                addonText && (
                  <span className={classNames('input-group-text', addonClassName)}>{addonText()}</span>
                )
              }
            </div>
          )
        }
      </div>
      {!hideError && (
        <InputError
          touched={touched || currentErrorText}
          error={error || currentErrorText}
        />
      )}
    </div>
  )
})

ReduxFormInput.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  id: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.string,
  hideError: PropTypes.bool,
  errorText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  inputMode: PropTypes.string,
  formClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  addonText: PropTypes.func,
  addonFunction: PropTypes.func,
  addonDirection: PropTypes.string,
  addonOnClick: PropTypes.func,
  onKeyPress: PropTypes.func,
  onKeyDown: PropTypes.func,
  onPaste: PropTypes.func,
  inputGroupClassName: PropTypes.string,
  addonClassName: PropTypes.string,
  min: PropTypes.number,
  isDetailError: PropTypes.bool,
  noMargin: PropTypes.bool,
  maxLength: PropTypes.number
}

ReduxFormInput.defaultProps = {
  input: {},
  meta: {},
  placeholder: '',
  disabled: false,
  className: '',
  type: 'text',
  hideError: false,
  errorText: null,
  label: null,
  formClassName: '',
  labelClassName: '',
  inputMode: 'text',
  addonText: null,
  addonFunction: null,
  addonDirection: 'left',
  addonOnClick: null,
  onKeyPress: null,
  onKeyDown: null,
  onPaste: null,
  inputGroupClassName: '',
  addonClassName: '',
  id: null,
  min: null,
  isDetailError: false,
  noMargin: false,
  maxLength: null
}

export default ReduxFormInput
