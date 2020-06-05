import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Logo = ({ children, className }) => {
  return (
    <div className={classNames('d-flex justify-content-center align-items-center w-100', className)}>
      { children }
    </div>
  )
}

Logo.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

Logo.defaultProps = {
  className: ''
}

export default Logo
