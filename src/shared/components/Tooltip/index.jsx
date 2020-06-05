import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import TooltipHeader from './Header'
import TooltipContent from './Content'

export {
  TooltipHeader,
  TooltipContent
}

const Tooltip = ({ children, isOpen, onClose }) => (
  <Fragment>
    { isOpen && onClose && (<div className='tooltip-overlay' role='presentation' onClick={onClose} />) }
    <div className={classNames('custom-tooltip', { 'd-block': isOpen })}>
      { children }
    </div>
  </Fragment>
)

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func
}

Tooltip.defaultProps = {
  onClose: null
}

Tooltip.Header = TooltipHeader
Tooltip.Content = TooltipContent

export default Tooltip
