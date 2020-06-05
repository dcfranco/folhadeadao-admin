import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Flexbox = ({ children, className, alignContent, justifyContent, flexColumn }) => {
  return (
    <div
      className={classNames('d-flex', className, {
        'flex-column': flexColumn
      })}
      style={{ alignContent, justifyContent }}
    >
      { children }
    </div>
  )
}

Flexbox.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  alignContent: PropTypes.string,
  justifyContent: PropTypes.string,
  flexColumn: PropTypes.bool
}

Flexbox.defaultProps = {
  className: '',
  alignContent: 'start',
  justifyContent: 'start',
  flexColumn: false
}

export default Flexbox
