import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// TODO: Tooltip
const SidePanelCard = ({ children, disabled, className, onClick, isActive }) => {
  return (
    <button
      type='button'
      disabled={disabled}
      className={classNames('btn sidepanel-card w-100 px-0 mb-2', className, {
        'active': isActive,
        'disabled cursor-blocked': disabled
      })}
      onClick={onClick}
    >
      { children }
    </button>
  )
}

SidePanelCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  // tooltip: PropTypes.string,
  isActive: PropTypes.bool,
  disabled: PropTypes.bool
}

SidePanelCard.defaultProps = {
  className: '',
  onClick: null,
  isActive: false,
  disabled: false
  // tooltip: null,
}

export default React.memo(SidePanelCard)
