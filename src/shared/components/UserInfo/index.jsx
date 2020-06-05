import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import Avatar from 'components/Avatar'

const UserInfo = (props) => {
  const {
    fullName,
    children,
    hideAvatar,
    className,
    avatarClassName,
    infoClassName
  } = props

  return (
    <div className='d-flex align-items-center'>
      { !hideAvatar && (
        <Avatar
          title={fullName}
          className={avatarClassName}
        />
      ) }
      <div className='d-flex flex-column justify-content-center ml-2'>
        <span className={classNames('d-block mb-n1 text-truncate', className)}>
          { fullName }
        </span>
        <span className={classNames('d-block font-size-sm text-truncate', infoClassName)}>
          { children }
        </span>
      </div>
    </div>
  )
}

UserInfo.propTypes = {
  hideAvatar: PropTypes.bool,
  className: PropTypes.string,
  fullName: PropTypes.string.isRequired,
  avatarClassName: PropTypes.string,
  children: PropTypes.node,
  infoClassName: PropTypes.string
}

UserInfo.defaultProps = {
  hideAvatar: false,
  className: '',
  children: null,
  avatarClassName: 'text-primary border-primary',
  infoClassName: ' font-weight-lighter text-low-dark'
}

export default React.memo(UserInfo)
