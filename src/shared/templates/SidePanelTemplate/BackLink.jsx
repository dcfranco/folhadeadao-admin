import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ArrowBack } from '@material-ui/icons'

const BackLink = ({ children, route }) => {
  return (
    <Link
      to={route}
      className='sidepanel-back-button'
    >
      <ArrowBack className='font-size-sm' />
      <span className='ml-1'>
        { children }
      </span>
    </Link>
  )
}

BackLink.propTypes = {
  children: PropTypes.node.isRequired,
  route: PropTypes.string.isRequired
}

export default React.memo(BackLink)
