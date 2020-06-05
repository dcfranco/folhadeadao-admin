import React from 'react'
import PropTypes from 'prop-types'
import { dateNormalizer } from 'form/normalizers'

const DateFormatter = ({ value }) => {
  const text = dateNormalizer(value, '')
  return (
    <span className='d-block w-100'>{text}</span>
  )
}

DateFormatter.propTypes = {
  value: PropTypes.any
}

DateFormatter.defaultProps = {
  value: 0
}

export default DateFormatter
