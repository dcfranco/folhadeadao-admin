import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Title = ({ children, className }) => {
  return (
    <h5 className={classNames('text-center font-weight-light mt-3 mb-4 pb-3', className)}>
      { children }
    </h5>
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
