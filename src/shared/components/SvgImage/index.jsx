import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Images from 'assets/svg'

const SvgShape = PropTypes.shape({
  id: PropTypes.string,
  viewBox: PropTypes.string,
  url: PropTypes.string,
  toString: PropTypes.func
})

const AVAILABLE_IMAGES = {
  ...Images
}

const SvgImage = memo(((props) => {
  const { icon, className, maxHeight, maxWidth, isOverflowHideen } = props
  if (!icon || !icon.viewBox) {
    return null
  }

  const [,, maxOriginalWidth, maxOriginalHeight] = String(icon.viewBox).split(' ')
  const overflowStyle = isOverflowHideen ? {
    minHeight: maxHeight || maxOriginalHeight,
    minWidth: maxWidth || maxOriginalWidth,
    overflowX: 'hidden'
  } : {}
  return (
    <svg
      viewBox={icon.viewBox}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        maxWidth: maxWidth || maxOriginalWidth,
        maxHeight: maxHeight || maxOriginalHeight,
        ...overflowStyle
      }}
    >
      <use xlinkHref={icon.url} />
    </svg>
  )
}))

SvgImage.propTypes = {
  icon: SvgShape.isRequired,
  className: PropTypes.string,
  maxWidth: PropTypes.string,
  maxHeight: PropTypes.string,
  isOverflowHideen: PropTypes.bool
}
SvgImage.defaultProps = {
  className: '',
  maxWidth: null,
  maxHeight: null,
  isOverflowHideen: false
}
SvgImage.AVAILABLE_IMAGES = AVAILABLE_IMAGES

export default SvgImage
