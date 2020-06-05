import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Edit } from '@material-ui/icons'

const Uncollapsed = ({ className, children, onClick }) => {
  return (
    <div className={classNames('uncollapsed', className)}>
      { children }
      <Edit onClick={onClick} className='cursor-pointer' />
    </div>
  )
}

Uncollapsed.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string
}

Uncollapsed.defaultProps = {
  className: '',
  onClick: null
}

export default Uncollapsed
