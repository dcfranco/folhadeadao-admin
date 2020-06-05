import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const ListHeader = ({ children, className }) => {
  return (
    <li className={classNames('list-group-item bg-logo text-primary', className)}>
      { children }
    </li>
  )
}

ListHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

ListHeader.defaultProps = {
  className: ''
}

export default ListHeader
