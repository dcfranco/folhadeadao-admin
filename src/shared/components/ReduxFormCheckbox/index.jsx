import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import Checkbox from 'components/Checkbox'

const ReduxFormCheckbox = forwardRef((props, ref) => {
  const {
    input,
    id,
    label,
    disabled,
    className,
    noMargin
  } = props

  return (
    <div className={noMargin ? 'mt-0' : 'mt-3'}>
      <Checkbox
        id={id || input.name}
        disabled={disabled}
        label={label}
        noMargin={noMargin}
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
  className: PropTypes.string,
  noMargin: PropTypes.bool
}

ReduxFormCheckbox.defaultProps = {
  input: {},
  disabled: false,
  className: '',
  label: null,
  id: null,
  noMargin: false
}

export default ReduxFormCheckbox
