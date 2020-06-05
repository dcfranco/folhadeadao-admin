import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import Checkbox from 'components/Checkbox'

const ReduxFormCheckbox = forwardRef((props, ref) => {
  const {
    input,
    id,
    label,
    disabled,
    className
  } = props

  return (
    <div className='mt-3'>
      <Checkbox
        id={id || input.name}
        disabled={disabled}
        label={label}
        checked={input.value}
        name={input.name}
        onChange={input.onChange}
        className={className}
        ref={ref}
      />
    </div>
  )
})

ReduxFormCheckbox.propTypes = {
  input: PropTypes.object,
  id: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string
}

ReduxFormCheckbox.defaultProps = {
  input: {},
  disabled: false,
  className: '',
  label: null,
  id: null
}

export default ReduxFormCheckbox
