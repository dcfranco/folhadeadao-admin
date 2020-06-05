import React from 'react'
import PropTypes from 'prop-types'

const Header = ({ children }) => {
  return (
    <div className='sidepanel-header border-bottom border-light pt-3 pb-2 px-3'>
      { children }
    </div>
  )
}

Header.propTypes = {
  children: PropTypes.node.isRequired
}

export default React.memo(Header)
