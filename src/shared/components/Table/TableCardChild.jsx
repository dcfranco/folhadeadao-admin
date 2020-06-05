import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { TableRowChild } from './TableRowChild'
import { TableCell } from './TableCell'

export const TableCardChild = memo(((props) => {
  const { children, className, isChildOpen } = props
  return (
    <TableRowChild
      className={className}
      isChildOpen={isChildOpen}
    >
      <TableCell className='px-2 pb-2 pt-3'>
        { children }
      </TableCell>
    </TableRowChild>
  )
}))

TableCardChild.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isChildOpen: PropTypes.bool
}

TableCardChild.defaultProps = {
  className: '',
  isChildOpen: false
}
