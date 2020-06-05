import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Banner = ({ children, className }) => {
  return (
    <div className='row'>
      <div className='col-12 px-0'>
        <div
          className={classNames(
            'd-flex justify-content-center px-3 px-md-4 mt-4',
            className
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

Banner.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

Banner.defaultProps = {
  className: ''
}

export default Banner
