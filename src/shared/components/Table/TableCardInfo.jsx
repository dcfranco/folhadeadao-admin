import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export const TableCardInfo = memo(({ children, className, size, noBorder }) => {
  return (
    <div
      className={classNames(`w-${size}`, className, {
        'border-right border-gray': !noBorder
      })}
    >
      { children }
    </div>
  )
})

TableCardInfo.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.oneOf(['auto', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100']),
  noBorder: PropTypes.bool
}

TableCardInfo.defaultProps = {
  children: null,
  size: 'auto',
  noBorder: false,
  className: ''
}
