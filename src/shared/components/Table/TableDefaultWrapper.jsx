import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export const TableDefaultWrapper = memo(((props) => {
  const { children, className } = props
  return (
    <div className={classNames('px-3 table-default-wrapper mt-1', className)}>
      { children }
    </div>
  )
}))

TableDefaultWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

TableDefaultWrapper.defaultProps = {
  className: ''
}
