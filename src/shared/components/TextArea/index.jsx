import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

const TextArea = (props) => {
  const {
    onChange,
    onBlur,
    name,
    id,
    disabled,
    className,
    placeholder,
    value,
    checked,
    inputMode,
    tabIndex
  } = props


  return (
    <Fragment>
      <textarea
        id={id}
        disabled={disabled}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
        className={className}
        checked={checked}
        inputMode={inputMode}
        tabIndex={tabIndex}
      />
    </Fragment>
  )
}

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  checked: PropTypes.any,
  inputMode: PropTypes.string,
  tabIndex: PropTypes.number
}

TextArea.defaultProps = {
  onChange: null,
  onBlur: null,
  value: '',
  placeholder: '',
  disabled: false,
  className: '',
  checked: false,
  inputMode: 'text',
  tabIndex: null
}

export default TextArea
