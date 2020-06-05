import PropTypes from 'prop-types'
import React from 'react'

const FeedbackLinks = ({ children }) => (
  <div className='links'>
    { children }
  </div>
)

FeedbackLinks.propTypes = {
  children: PropTypes.node.isRequired
}

export default FeedbackLinks
