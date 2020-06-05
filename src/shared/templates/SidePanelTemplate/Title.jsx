import React from 'react'
import PropTypes from 'prop-types'

const Title = ({ children }) => {
  return (
    <span className='p-0 font-size-1xl'>{ children }</span>
  )
}

Title.propTypes = {
  children: PropTypes.node.isRequired
}

export default React.memo(Title)
