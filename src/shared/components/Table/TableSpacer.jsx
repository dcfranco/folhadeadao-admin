import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export const TableSpacer = memo(((props) => {
  const { hasChild, isChild, isChildOpen, className } = props
  return (
    <tr
      className={classNames('is-spacer', {
        'has-child-spacer': hasChild,
        'is-child-spacer': isChild,
        'is-child-spacer-opened': isChildOpen,
        'd-none': isChild && !isChildOpen
      }, className)}
    />
  )
}))

TableSpacer.propTypes = {
  hasChild: PropTypes.bool,
  isChild: PropTypes.bool,
  isChildOpen: PropTypes.bool,
  className: PropTypes.string
}

TableSpacer.defaultProps = {
  hasChild: false,
  isChild: false,
  isChildOpen: false,
  className: ''
}
