import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const List = ({ children, className }) => {
  return (
    <ul className={classNames('list-group', className)}>
      { children }
    </ul>
  )
}

List.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

List.defaultProps = {
  className: ''
}

export default List
