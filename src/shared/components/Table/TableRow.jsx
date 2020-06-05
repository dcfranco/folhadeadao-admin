import React, { memo, Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { TableSpacer } from './TableSpacer'

export const TableRow = memo(((props) => {
  const { children, className, onClick, hasChild, isChildOpen, noSpacer, disabled } = props
  return (
    <Fragment>
      { !noSpacer && (<TableSpacer hasChild={hasChild} />) }
      <tr
        className={classNames(className, {
          'clickable': onClick !== null,
          'has-child-open': hasChild && isChildOpen,
          'disabled': disabled
        })}
        onClick={onClick}
        role='presentation'
      >
        { children }
      </tr>
    </Fragment>
  )
}))

TableRow.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hasChild: PropTypes.bool,
  isChildOpen: PropTypes.bool,
  onClick: PropTypes.func,
  noSpacer: PropTypes.bool,
  disabled: PropTypes.bool
}

TableRow.defaultProps = {
  className: '',
  onClick: null,
  hasChild: false,
  isChildOpen: false,
  noSpacer: false,
  disabled: false
}
