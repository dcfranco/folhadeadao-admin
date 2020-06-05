import React from 'react'
import PropTypes from 'prop-types'

const DefaultContainer = ({ children }) => {
  return (
    <>{ children }</>
  )
}

DefaultContainer.propTypes = {
  children: PropTypes.node.isRequired
}

export default React.memo(DefaultContainer)
