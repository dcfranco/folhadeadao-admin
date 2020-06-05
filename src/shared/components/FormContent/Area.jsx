import React from 'react'
import PropTypes from 'prop-types'

const FormContentArea = ({ children }) => {
  return (
    <div className='bg-light p-4 border border-dark border-dotted pl-md-5'>
      { children }
    </div>
  )
}

FormContentArea.propTypes = {
  children: PropTypes.node.isRequired
}

export default React.memo(FormContentArea)
