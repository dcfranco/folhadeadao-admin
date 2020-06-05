import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const ColumnWrapper = ({ children, className }) => {
  return (
    <div className='row mt-0'>
      <div className='col-12'>
        <div className={classNames('d-flex py-sticky-0', className)}>
          { children }
        </div>
      </div>
    </div>
  )
}

ColumnWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

ColumnWrapper.defaultProps = {
  className: 'py-4'
}

export default React.memo(ColumnWrapper)
