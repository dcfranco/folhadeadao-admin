import React from 'react'
import PropTypes from 'prop-types'

const DomainCard = ({ label, value }) => {
  return (
    <div className='d-flex align-items-center w-100'>
      <div className='d-flex flex-column w-100 px-3'>
        <span className='d-block text-left font-weight-bold text-truncate'>{ label }</span>
        <span className='d-block text-left text-truncate text-low-dark font-size-sm'>{ value }</span>
      </div>
    </div>
  )
}

DomainCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}

export default React.memo(DomainCard)
