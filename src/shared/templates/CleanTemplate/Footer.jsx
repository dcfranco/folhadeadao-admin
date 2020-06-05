import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Footer = ({ children, className }) => {
  return (
    <div className='row mt-2 mb-3'>
      <div className='col-12'>
        <div className={classNames('d-flex justify-content-md-end align-items-center w-100 mt-1', className)}>
          { children }
        </div>
      </div>
    </div>
  )
}

Footer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

Footer.defaultProps = {
  className: ''
}

export default Footer
