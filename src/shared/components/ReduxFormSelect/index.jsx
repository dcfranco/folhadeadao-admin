import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import Select from 'components/Select'
import InputError from 'components/InputError'

const ReduxFormSelect = (props) => {
  const {
    input,
    meta: { touched, error },
    id,
    label,
    disabled,
    className,
    hideError,
    errorText,
    placeholder,
    labelClassName,
    options,
    defaultValue,
    isDetailError,
    noMargin
  } = props

  const inputTouched = touched
  const errors = useSelector(state => state.errors)

  const currentErrorText = errors.getFieldError(input.name, isDetailError) || errorText

  const selectClassName = classNames('form-control custom-select', {
    'is-invalid': (error && inputTouched) || currentErrorText
  })

  const labelClass = classNames(labelClassName, {
    'text-danger': (error && inputTouched) || currentErrorText,
    'sr-only': !label
  }, 'd-block text-truncate')

  return (
    <div
      className={classNames('form-group', className, {
        'mb-0': noMargin
      })}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-for */}
      <label htmlFor={input.name} className={labelClass}>{ label }</label>
      <div className={classNames('input-group')}>
        <Select
          id={id}
          disabled={disabled}
          name={input.name}
          onChange={input.onChange}
          onBlur={input.onBlur}
          value={input.value}
          placeholder={placeholder}
          className={selectClassName}
          options={options}
          defaultValue={defaultValue}
        />
      </div>
      {!hideError && (
        <InputError
          touched={touched || currentErrorText}
          error={error || currentErrorText}
        />
      )}
    </div>
  )
}

ReduxFormSelect.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  hideError: PropTypes.bool,
  errorText: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,
  defaultValue: PropTypes.bool,
  isDetailError: PropTypes.bool,
  noMargin: PropTypes.bool
}

ReduxFormSelect.defaultProps = {
  input: {},
  meta: {},
  placeholder: '',
  disabled: false,
  className: '',
  labelClassName: '',
  hideError: false,
  errorText: null,
  label: null,
  defaultValue: true,
  isDetailError: false,
  noMargin: false
}

export default ReduxFormSelect
