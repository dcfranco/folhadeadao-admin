import React, { memo } from 'react'
import PropTypes from 'prop-types'

export const TableHead = memo(((props) => {
  const { children, className } = props
  return (
    <thead>
      <tr className={className}>
        { children }
      </tr>
    </thead>
  )
}))

TableHead.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

TableHead.defaultProps = {
  className: ''
}
