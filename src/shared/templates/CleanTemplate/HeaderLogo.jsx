import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const HeaderLogo = ({ children, className, color }) => {
  return (
    <div className='row'>
      <div className='col-12 px-0'>
        <div className={classNames('d-flex justify-content-center align-items-center w-100 py-3 header-logo', color, className)}>
          { children }
        </div>
      </div>
    </div>
  )
}

HeaderLogo.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.string
}

HeaderLogo.defaultProps = {
  className: '',
  color: 'bg-primary'
}

export default HeaderLogo
