import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export const TableDefault = memo(((props) => {
  const { children, className } = props
  return (
    <div className='w-100 pb-2 overflow-auto'>
      <table className={classNames('table', className)}>
        { children }
      </table>
    </div>
  )
}))

TableDefault.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

TableDefault.defaultProps = {
  className: ''
}
