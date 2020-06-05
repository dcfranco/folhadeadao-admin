import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Title = ({ children, className }) => {
  return (
    <h2 className={classNames('font-weight-normal mb-0 pb-0', className)}>
      { children }
    </h2>
  )
}

Title.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

Title.defaultProps = {
  className: ''
}

export default React.memo(Title)
