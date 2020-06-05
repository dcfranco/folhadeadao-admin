import React from 'react'
import PropTypes from 'prop-types'

const CheckboxFormatter = (props) => {
  const { value, column } = props
  return (
    <div className='form-check d-block w-100 text-center'>
      <input
        type='checkbox'
        checked={value === true}
        onChange={() => {}}
        name={column.key}
        className='form-check-input position-static'
      />
    </div>
  )
}

CheckboxFormatter.propTypes = {
  value: PropTypes.any,
  column: PropTypes.object
}

CheckboxFormatter.defaultProps = {
  value: 0,
  column: {}
}

export default CheckboxFormatter
