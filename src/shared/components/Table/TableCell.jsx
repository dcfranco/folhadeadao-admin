import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export const TableCell = memo(((props) => {
  const { children, className, onClick, width, colSpan, disableAction, isHide } = props
  if (isHide) {
    return null
  }

  return (
    <td
      className={classNames(className, {
        'fixed-action': !!onClick && !disableAction
      })}
      onClick={onClick}
      style={{ width }}
      role='presentation'
      colSpan={colSpan}
    >
      { children }
    </td>
  )
}))

TableCell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  colSpan: PropTypes.string,
  disableAction: PropTypes.bool,
  isHide: PropTypes.bool,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
}

TableCell.defaultProps = {
  children: null,
  className: '',
  onClick: null,
  width: '',
  colSpan: null,
  disableAction: false,
  isHide: false
}
