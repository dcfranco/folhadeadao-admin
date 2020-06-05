import React from 'react'
import PropTypes from 'prop-types'
import Input from 'components/Input'

const Checkbox = React.forwardRef((props, ref) => {
  const {
    onChange,
    name,
    id,
    disabled,
    className,
    checked,
    label
  } = props

  return (
    <label className='checkbox-container'>{ label }
      <Input
        type='checkbox'
        checked={checked}
        id={id}
        name={name}
        onChange={onChange}
        className={className}
        ref={ref}
        disabled={disabled}
      />
      <span className='checkmark' />
    </label>
  )
})

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  checked: PropTypes.any,
  label: PropTypes.string
}

Checkbox.defaultProps = {
  onChange: null,
  disabled: false,
  className: '',
  checked: false,
  label: ''
}

export default Checkbox
