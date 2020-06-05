import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Cards = ({ children, className }) => {
  return (
    <div className={classNames('row', className)}>
      { children }
    </div>
  )
}

Cards.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

Cards.defaultProps = {
  className: ''
}

export { default as Card } from './Card'
export { default as CardAlert } from './Alert'
export { default as CardRow } from './Row'
export { default as CardTitle } from './Title'
export { default as CardContent } from './Content'
export { default as CardInfo } from './Info'
export { default as CardAction } from './Action'

export default Cards
