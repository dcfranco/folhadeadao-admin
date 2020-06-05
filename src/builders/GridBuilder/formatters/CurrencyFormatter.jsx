import React from 'react'
import PropTypes from 'prop-types'
import { parseCurrency } from 'helpers'

const CurrencyFormatter = ({ value }) => {
  const text = parseCurrency(value)
  return (
    <span className='d-block w-100 text-right'>{text}</span>
  )
}

CurrencyFormatter.propTypes = {
  value: PropTypes.any
}

CurrencyFormatter.defaultProps = {
  value: 0
}

export default CurrencyFormatter
