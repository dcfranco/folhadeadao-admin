import React from 'react'
import PropTypes from 'prop-types'
import getFirstLetters from 'helpers/getFirstLetters'

const ContractCard = ({ title, amount }) => {
  return (
    <div className='d-flex align-items-center w-100'>
      <div className='d-flex align-items-center justify-content-center w-30'>
        <span className='font-size-3xl font-weight-bold'>
          { getFirstLetters(title) }
        </span>
      </div>
      <div className='d-flex flex-column w-70'>
        <span className='d-block text-left text-truncate'>{ title }</span>
        <span className='d-block text-left text-truncate text-low-dark font-size-sm'>{ amount }</span>
      </div>
    </div>
  )
}

ContractCard.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired
}

export default React.memo(ContractCard)
