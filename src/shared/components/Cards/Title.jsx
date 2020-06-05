import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Avatar from 'components/Avatar'

const CardTitle = ({ children, className, isAvatarVisible }) => {
  return (
    <div className='card-title'>
      { isAvatarVisible && (
        <Avatar title={children} className='card-avatar' maxLetters={1} />
      ) }
      <h6 className={classNames('ml-2 mb-0 pb-0', className)}>
        { children }
      </h6>
    </div>
  )
}

CardTitle.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  isAvatarVisible: PropTypes.bool
}

CardTitle.defaultProps = {
  className: '',
  isAvatarVisible: false
}

export default CardTitle
