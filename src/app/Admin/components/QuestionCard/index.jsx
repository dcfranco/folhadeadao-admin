import React from 'react'
import PropTypes from 'prop-types'

const QuestionCard = ({ title, description, order }) => {
  return (
    <div className='d-flex align-items-center w-100'>
      <div className='d-flex align-items-center justify-content-center w-20'>
        <span className='font-size-3xl font-weight-bold'>
          { order }
        </span>
      </div>
      <div className='d-flex flex-column w-70'>
        <span className='d-block text-left text-truncate font-weight-bold'>{ title }</span>
        <span className='d-block text-left text-truncate text-low-dark font-size-sm'>{ description }</span>
      </div>
    </div>
  )
}

QuestionCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  order: PropTypes.number.isRequired
}

export default React.memo(QuestionCard)
