import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const ListContainer = ({ children, className }) => {
  return (
    <div className='row d-flex justify-content-center pt-5'>
      <div className={classNames('col-sm-8 col-md-6 col-lg-4', className)}>
        { children }
      </div>
    </div>
  )
}

ListContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

ListContainer.defaultProps = {
  className: ''
}

export default ListContainer
