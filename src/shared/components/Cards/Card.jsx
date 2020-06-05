import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Card = ({ children, className, size, onClick }) => {
  return (
    <div className={size}>
      <div
        className={classNames('card mb-4', className, {
          'cursor-pointer': !!onClick
        })}
        onClick={() => onClick && onClick()}
      >
        { children }
      </div>
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func
}

Card.defaultProps = {
  className: '',
  onClick: null,
  size: 'col-12 col-lg-6 col-xl-4 col-2xl-3'
}

export default Card
