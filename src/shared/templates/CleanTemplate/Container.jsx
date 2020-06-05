import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Container = ({ children, className, isCentered, size }) => {
  return (
    <div
      className={classNames('row h-md-100', className, {
        'justify-content-md-center align-items-md-center': isCentered
      })}
    >
      <div className={classNames(size, 'content')}>{children}</div>
    </div>
  )
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  size: PropTypes.string,
  isCentered: PropTypes.bool
}

Container.defaultProps = {
  className: '',
  size: 'col-12 col-md-6',
  isCentered: true
}

export default Container
