import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const TooltipHeader = ({ children, className }) => (
  <div className={classNames('tooltip-header', className)}>
    { children }
  </div>
)

TooltipHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

TooltipHeader.defaultProps = {
  className: ''
}

export default TooltipHeader
