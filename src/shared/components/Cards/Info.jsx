import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const CardInfo = ({ children, title, className }) => {
  return (
    <div className={classNames('card-info', className)}>
      { title && (
        <span className='title'> { title } </span>
      )}
      <span> { children } </span>
    </div>
  )
}

CardInfo.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  title: PropTypes.string
}

CardInfo.defaultProps = {
  className: '',
  title: null
}

export default CardInfo
