import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Header = ({ children, className }) => {
  return (
    <div className={classNames('dropdown-header', className)}>
      { children }
    </div>
  )
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

Header.defaultProps = {
  className: ''
}

export default React.memo(Header)
