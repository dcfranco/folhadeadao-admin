import React from 'react'
import PropTypes from 'prop-types'

const ViewTable = ((props) => {
  const { className, title, children } = props
  return (
    <div className={className}>
      <h5 className='text-primary'>{ title }</h5>
      { children }
    </div>
  )
})

ViewTable.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

ViewTable.defaultProps = {
  className: 'mb-4'
}

export { ViewTableRow } from './ViewTableRow'
export { ViewTableCell } from './ViewTableCell'

export default ViewTable
