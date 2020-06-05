import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const HeaderInfo = ({ title, children, className }) => {
  return (
    <div className={classNames('d-flex flex-column justify-content-center', className)}>
      <span className='d-block text-low-dark text-truncate'>
        { title }
      </span>
      <span className='d-block text-truncate'>
        { children }
      </span>
    </div>
  )
}

HeaderInfo.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

HeaderInfo.defaultProps = {
  className: ''
}

export default React.memo(HeaderInfo)
