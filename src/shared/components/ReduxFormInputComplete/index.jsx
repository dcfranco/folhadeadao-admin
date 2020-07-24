import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { forwardRef, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import Input from 'components/Input'
import InputError from 'components/InputError'
import Autosuggest from 'react-autosuggest'

const getSuggestionValue = suggestion => suggestion.value
const renderSuggestion = suggestion => (
  <div className=''>
    {suggestion.name}
  </div>
)

const ReduxFormInputComplete = forwardRef((props, ref) => {
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
    maxLength,

    suggestions
  } = props

  const { touched, error } = meta
  const [suggestionsFilter, updateSuggestionsFilter] = useState([])

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

  const onSuggestionsClearRequested = useCallback(() => {
    updateSuggestionsFilter([])
  }, [updateSuggestionsFilter])


  const onSuggestionsFetchRequested = useCallback(
    async ({ value, reason }) => {
      if (reason !== 'suggestion-selected') {
        const inputValue = value.trim().toLowerCase()
        const inputLength = inputValue.length
        const nSuggestions = inputLength === 0
          ? []
          : suggestions.filter(
            (item) => item.name.toLowerCase().slice(0, inputLength) === inputValue
          )

        updateSuggestionsFilter(nSuggestions)
      }
    },
    [input, suggestions, updateSuggestionsFilter]
  )


  return (
    <Autosuggest
      ref={ref}
      suggestions={suggestionsFilter}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionSelected={(e, d) => console.log(d)}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      shouldRenderSuggestions={(v) => typeof v === 'string'}
      alwaysRenderSuggestions={true}
      theme={{
        container: 'autosuggest',
        suggestionsContainer: 'autosuggest-container',
        suggestionsContainerOpen: 'autosuggest-container-open',
        suggestionsList: 'autosuggest-list',
        suggestion: 'suggestion',
        suggestionFirst: 'suggestion-first'
      }}
      renderSuggestion={renderSuggestion}
      renderInputComponent={inputProps => (
        <div className={formGroupClassName}>
          {/* eslint-disable-next-line jsx-a11y/label-has-for */}
          <label htmlFor={input.name} className={labelClass}>{label}</label>

          <div className={classNames('input-group', inputGroupClassName)}>
            {addonText && addonDirection === 'left' && (
              <div className='input-group-prepend' onClick={addonOnClick}>
                {addonFunction && addonFunction()}
                {addonText && (<span className='input-group-text'>{addonText()}</span>)}
              </div>
            )}

            <Input {...inputProps} />

            {(addonText || addonFunction) && addonDirection === 'right' && (
              <div className='input-group-append' onClick={addonOnClick}>
                {addonFunction && addonFunction()}
                {addonText && (<span className={classNames('input-group-text', addonClassName)}>{addonText()}</span>)}
              </div>
            )}
          </div>
          {!hideError && (
            <InputError
              touched={touched || currentErrorText}
              error={error || currentErrorText}
            />
          )}
        </div>
      )}
      inputProps={{
        type,
        autoComplete: 'off',
        id: id || input.name,
        disabled,
        name: input.name,
        onChange: input.onChange,
        value: input.value,
        placeholder,
        inputMode,
        className: classNames(inputClassName, className),
        min,
        maxLength
      }}
    />

  )
})

ReduxFormInputComplete.propTypes = {
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
  maxLength: PropTypes.number,
  suggestions: PropTypes.array.isRequired
}

ReduxFormInputComplete.defaultProps = {
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

export default ReduxFormInputComplete
