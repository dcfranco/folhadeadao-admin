import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const CardRow = ({ children, className }) => {
  return (
    <div className={classNames('d-flex align-items-center justify-between', className)}>
      { children }
    </div>
  )
}

CardRow.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

CardRow.defaultProps = {
  className: ''
}

export default CardRow
