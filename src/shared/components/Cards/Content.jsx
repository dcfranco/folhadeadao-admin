import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const CardContent = ({ children, className }) => {
  return (
    <div className={classNames('card-content', className)}>
      { children }
    </div>
  )
}

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

CardContent.defaultProps = {
  className: ''
}

export default CardContent
