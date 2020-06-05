import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const ColumnLeft = ({ children, className }) => {
  return (
    <div className={classNames('mr-auto', className)}>
      { children }
    </div>
  )
}

ColumnLeft.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

ColumnLeft.defaultProps = {
  className: ''
}

export default React.memo(ColumnLeft)
