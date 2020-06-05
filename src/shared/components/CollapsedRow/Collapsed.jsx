import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Close } from '@material-ui/icons'

const Collapsed = ({ className, children, title, onClick }) => {
  return (
    <div className={classNames('collapsed', className)}>
      <div className='d-flex justify-content-between mb-4'>
        <span className='font-weight-normal font-20'>{ title }</span>
        <Close
          onClick={onClick}
          className='cursor-pointer'
        />
      </div>
      { children }
    </div>
  )
}

Collapsed.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string
}

Collapsed.defaultProps = {
  className: '',
  onClick: null
}

export default Collapsed
