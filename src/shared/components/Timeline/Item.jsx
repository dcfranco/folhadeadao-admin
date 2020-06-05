import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const TimelineItem = ({ children, className }) => {
  return (
    <div className={classNames('timeline-item', className)}>
      { children }
    </div>
  )
}

TimelineItem.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

TimelineItem.defaultProps = {
  className: ''
}

export default TimelineItem
