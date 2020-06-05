import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

const FeedbackRight = ({ children, className }) => (
  <div className={classNames('feedback-right bg-white', className)}>
    { children }
  </div>
)

FeedbackRight.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

FeedbackRight.defaultProps = {
  className: ''
}

export default FeedbackRight
