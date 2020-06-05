import PropTypes from 'prop-types'
import React from 'react'
import { ArrowForward } from '@material-ui/icons'
import classNames from 'classnames'

const FeedbackLink = ({ children, onClick, hasArrow, className }) => (
  <div className='link'>
    <button type='button' onClick={onClick} className={classNames('btn btn-link', className)}>
      <span>{ children }</span>
      { hasArrow && (
        <ArrowForward />
      )}
    </button>
  </div>
)

FeedbackLink.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  hasArrow: PropTypes.bool,
  className: PropTypes.string
}

FeedbackLink.defaultProps = {
  hasArrow: false,
  className: ''
}

export default FeedbackLink
