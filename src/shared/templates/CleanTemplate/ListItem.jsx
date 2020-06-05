import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { ArrowForward } from '@material-ui/icons'

const ListHeader = ({ children, className, onClick }) => {
  const isClickable = !!onClick
  return (
    <li
      role='presentation'
      onClick={onClick}
      className={classNames('list-group-item', className, {
        'clickable': isClickable
      })}
    >
      { children }
      { isClickable && (<ArrowForward className='ml-auto' />) }
    </li>
  )
}

ListHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func
}

ListHeader.defaultProps = {
  className: '',
  onClick: undefined
}

export default ListHeader
