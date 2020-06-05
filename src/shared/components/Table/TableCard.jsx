import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { TableRow } from './TableRow'
import { TableCell } from './TableCell'

export const TableCard = memo(((props) => {
  const { children, className, hasChild, isChildOpen, onClick, isInvalid } = props
  return (
    <TableRow
      className={classNames('d-lg-none', className)}
      hasChild={hasChild}
      isChildOpen={isChildOpen}
    >
      <TableCell
        className={classNames('px-2', {
          'border border-danger': isInvalid
        })}
        onClick={onClick}
      >
        { children }
      </TableCell>
    </TableRow>
  )
}))

TableCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hasChild: PropTypes.bool,
  isChildOpen: PropTypes.bool,
  isInvalid: PropTypes.bool,
  onClick: PropTypes.func
}

TableCard.defaultProps = {
  className: '',
  hasChild: false,
  isChildOpen: false,
  isInvalid: false,
  onClick: undefined
}
