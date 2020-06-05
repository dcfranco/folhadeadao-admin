import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export const TableHeader = memo(((props) => {
  const { children, className, onClick, width, isAction, isHide } = props
  if (isHide) {
    return null
  }

  return (
    <th
      className={classNames(className, {
        'fixed-action': isAction
      })}
      onClick={onClick}
      style={{ width }}
      scope='col'
    >
      { children }
    </th>
  )
}))

TableHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  isAction: PropTypes.bool,
  isHide: PropTypes.bool,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
}

TableHeader.defaultProps = {
  children: null,
  className: '',
  isAction: false,
  onClick: null,
  width: '',
  isHide: false
}
