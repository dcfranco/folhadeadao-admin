import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Input from 'components/Input'
import InputError from 'components/InputError'
import { useSelector } from 'react-redux'

import InputAddonBuilder from './builders/InputAddonBuilder'

const ReduxFormInputBuilder = (displayName = 'ReduxFormInputBuilder') => {
  // Addons to render
  let _leftAddon
  let _rightAddon

  // Disable Margin
  let _disableMargin = false

  // ClassNames (Form, Label and InputGroup)
  let _classNames

  // Default ClassNames
  const _defaultClassNames = {
    form: ['form-group'],
    label: [],
    input: ['form-control'],
    group: ['input-group']
  }

  // Properties
  let _isDetailError = false
  let _hideError = false

  const builder = {
    leftAddon: leftAddon => {
      _leftAddon = leftAddon
      return builder
    },
    disableMargin: () => {
      _disableMargin = true
      return builder
    },
    rightAddon: rightAddon => {
      _rightAddon = rightAddon
      return builder
    },
    classNames: classNamesFn => {
      _classNames = classNamesFn
      return builder
    },
    isDetailError: () => {
      _isDetailError = true
      return builder
    },
    hideError: () => {
      _hideError = true
      return builder
    },
    build: () => {
      const defaultClassNames = _classNames && typeof _classNames === 'function'
        ? _classNames(_defaultClassNames)
        : _defaultClassNames

      const {
        form: formClassNames,
        label: labelClassNames,
        input: inputClassNames,
        group: groupClassNames
      } = defaultClassNames

      const InputBuilt = (props) => {
        const {
          id,
          input,
          label,
          type,
          disabled,
          placeholder,
          inputMode,
          className,
          meta: { touched, error }
        } = props

        const errors = useSelector(state => state.errors)
        const fieldError = errors.getFieldError(input.name, _isDetailError) || error

        return (
          <div
            className={classNames(...formClassNames, {
              'mb-0': _disableMargin
            })}
          >
            <label
              htmlFor={input.name}
              className={classNames(...labelClassNames, {
                'text-danger': (touched && fieldError),
                'sr-only': !label
              })}
            >
              { label }
            </label>

            <div
              className={classNames(...groupClassNames, {
              })}
            >
              { _leftAddon && _leftAddon(props) }
              <Input
                type={type}
                id={id || input.name}
                disabled={disabled}
                name={input.name}
                onChange={input.onChange}
                onFocus={input.onFocus}
                onBlur={input.onBlur}
                value={input.value}
                placeholder={placeholder}
                inputMode={inputMode}
                className={classNames(...inputClassNames, className, {
                  'is-invalid': (touched && fieldError),
                  'has-rightAddon': !!_rightAddon,
                  'has-leftAddon': !!_leftAddon
                })}
              />
              { _rightAddon && _rightAddon(props) }
            </div>

            {!_hideError && (
              <InputError
                touched={touched}
                error={error || fieldError}
              />
            )}
          </div>
        )
      }

      InputBuilt.propTypes = {
        input: PropTypes.object,
        meta: PropTypes.object,
        id: PropTypes.string.isRequired,
        label: PropTypes.string,
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        type: PropTypes.string,
        inputMode: PropTypes.string,
        className: PropTypes.string
      }
      InputBuilt.defaultProps = {
        input: {},
        meta: {},
        label: '',
        type: 'text',
        placeholder: '',
        disabled: false,
        inputMode: 'text',
        className: ''
      }

      InputBuilt.displayName = displayName

      return InputBuilt
    }
  }

  return builder
}

ReduxFormInputBuilder.InputAddonBuilder = InputAddonBuilder

export default ReduxFormInputBuilder
