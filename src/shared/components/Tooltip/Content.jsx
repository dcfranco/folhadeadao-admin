import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const TooltipContent = ({ children, className }) => (
  <div className={classNames('tooltip-description', className)}>
    { children }
  </div>
)

TooltipContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

TooltipContent.defaultProps = {
  className: ''
}

export default TooltipContent
