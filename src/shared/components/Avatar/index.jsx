// @flow
import React from 'react'
import classNames from 'classnames'
import SvgImage from 'components/SvgImage'
import getFirstLetters from 'helpers/getFirstLetters'

type AvatarProps = {
  title: string,
  maxLetters?: number,
  className?: string,
  icon?: Function
}

const isSvgImage = (icon) => icon && icon.viewBox && (
  <SvgImage icon={icon} maxWidth='20px' maxHeight='20px' />
)
const isIcon = (Icon) => Icon && <Icon />

const Avatar = ({ title, icon, className, maxLetters }: AvatarProps) => {
  return (
    <div className={classNames('avatar', className)}>
      { isSvgImage(icon) || isIcon(icon) || getFirstLetters(title).substr(0, maxLetters) }
    </div>
  )
}

Avatar.defaultProps = {
  className: '',
  maxLetters: 2,
  icon: null
}

export default Avatar
