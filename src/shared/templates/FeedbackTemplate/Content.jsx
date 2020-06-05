import PropTypes from 'prop-types'
import React from 'react'

const FeedbackContent = ({ children }) => (
  <div className='feedback-content bg-white'>
    { children }
  </div>
)

FeedbackContent.propTypes = {
  children: PropTypes.node.isRequired
}

export default FeedbackContent
