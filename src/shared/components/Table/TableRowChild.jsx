import React, { memo, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { TableSpacer } from './TableSpacer'

export const TableRowChild = memo(((props) => {
  const { children, className, onClick, isChildOpen } = props
  return (
    <Fragment>
      <TableSpacer isChild={true} isChildOpen={isChildOpen} />
      <tr
        className={classNames('is-row-child', {
          'clickable': onClick !== null,
          'd-none': !isChildOpen
        }, className)}
        onClick={onClick}
        role='presentation'
      >
        { children }
      </tr>
    </Fragment>
  )
}))

TableRowChild.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isChildOpen: PropTypes.bool,
  onClick: PropTypes.func
}

TableRowChild.defaultProps = {
  className: '',
  onClick: null,
  isChildOpen: false
}
