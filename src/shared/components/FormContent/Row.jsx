import React from 'react'
import PropTypes from 'prop-types'

const FormContentRow = ({ children }) => {
  return (
    <div className='row'>
      { children }
    </div>
  )
}

FormContentRow.propTypes = {
  children: PropTypes.node.isRequired
}

export default React.memo(FormContentRow)
