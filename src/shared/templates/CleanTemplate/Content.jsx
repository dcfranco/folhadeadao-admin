import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Content = ({ children, className }) => {
  return (
    <div className='row'>
      <div className='col-12 px-0'>
        <div className={classNames('py-3 px-3 px-md-4', className)}>
          { children }
        </div>
      </div>
    </div>
  )
}

Content.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

Content.defaultProps = {
  className: ''
}

export default Content
