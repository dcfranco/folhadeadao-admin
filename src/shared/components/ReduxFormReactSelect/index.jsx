/* eslint-disable react/prop-types */
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import Select, { components } from 'react-select'
import InputError from 'components/InputError'

const ReduxFormReactSelect = (props) => {
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
  const errors = useSelector((state) => state.errors)

  const currentErrorText = errors.getFieldError(input.name, isDetailError) || errorText

  const selectClassName = classNames('form-control custom-select p-0', {
    'is-invalid': (error && inputTouched) || currentErrorText,
    'no-value': defaultValue && input.value === ''
  })

  const labelClass = classNames(
    labelClassName,
    {
      'text-danger': (error && inputTouched) || currentErrorText,
      'sr-only': !label
    },
    'd-block text-truncate'
  )

  return (
    <Select
      id={id}
      disabled={disabled}
      name={input.name}
      onChange={input.onChange}
      value={input.value}
      onBlur={() => input.onBlur()}
      getOptionLabel={(o) => o.label}
      getOptionValue={(o) => o.value}
      blurInputOnSelect={true}
      components={{
        SelectContainer: ({ children, ...innerProps }) => {
          return (
            <components.SelectContainer
              {...innerProps}
              className={classNames('form-group', className, {
                'mb-0': noMargin
              })}
            >
              <label htmlFor={input.name} className={labelClass}>
                {label}
              </label>
              {children}
              {!hideError && (
                <InputError
                  touched={touched || currentErrorText}
                  error={error || currentErrorText}
                />
              )}
            </components.SelectContainer>
          )
        },
        Control: ({ children, ...innerProps }) => {
          return (
            <components.Control
              {...innerProps}
              className={selectClassName}
            >
              {children}
            </components.Control>
          )
        },
        IndicatorsContainer: ({ children, ...innerProps }) => {
          return (
            <components.IndicatorsContainer
              {...innerProps}
              className='d-none'
            >
              {children}
            </components.IndicatorsContainer>
          )
        }
      }}
      placeholder={placeholder}
      options={options}
      defaultValue={defaultValue}
    />
  )
}

ReduxFormReactSelect.propTypes = {
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
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  defaultValue: PropTypes.bool,
  isDetailError: PropTypes.bool,
  noMargin: PropTypes.bool
}

ReduxFormReactSelect.defaultProps = {
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

export default ReduxFormReactSelect
