import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Title = ({ children, className }) => {
  return (
    <h3 className={classNames('mt-3 mb-0 pb-0', className)}>
      { children }
    </h3>
  )
}

Title.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

Title.defaultProps = {
  className: ''
}

export default Title
