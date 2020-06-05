import React from 'react'
import PropTypes from 'prop-types'

const Links = ({ children }) => {
  return (
    <div className='sidepanel-links px-1 py-2'>
      { children }
    </div>
  )
}

Links.propTypes = {
  children: PropTypes.node.isRequired
}

export default React.memo(Links)
