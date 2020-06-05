import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Timeline = ({ children, className, title }) => {
  return (
    <div className={classNames('timeline', className)}>
      <span className='timeline-title'>{ title }</span>
      <div className='timeline-content'>
        { children }
      </div>
    </div>
  )
}

Timeline.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string
}

Timeline.defaultProps = {
  className: ''
}

export { default as TimelineItem } from './Item'

export default Timeline
