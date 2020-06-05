import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export const ViewTableRow = ((props) => {
  const { children, className } = props
  return (
    <div className={classNames(className, 'd-flex mt-n2 flex-wrap mx-auto w-100')}>
      { children }
    </div>
  )
})

ViewTableRow.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

ViewTableRow.defaultProps = {
  className: ''
}
