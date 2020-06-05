import PropTypes from 'prop-types'
import React from 'react'
import SvgImage from 'components/SvgImage'
import classNames from 'classnames'

const FeedbackHeader = ({ desktopIconName, mobileIconName, children, bgClassName }) => (
  <div className={classNames('feedback-header', bgClassName)}>
    <div className='d-block d-md-none mobile-icon'>
      { mobileIconName && (<SvgImage icon={mobileIconName} />) }
    </div>
    <h2 className='d-block font-weight-regular'>{ children }</h2>
    <div className='d-none d-md-block desktop-icon'>
      { desktopIconName && (<SvgImage icon={desktopIconName} />) }
    </div>
  </div>
)

FeedbackHeader.propTypes = {
  children: PropTypes.node.isRequired,
  desktopIconName: PropTypes.object,
  mobileIconName: PropTypes.object,
  bgClassName: PropTypes.string
}

FeedbackHeader.defaultProps = {
  bgClassName: 'bg-main',
  desktopIconName: null,
  mobileIconName: null
}

export default FeedbackHeader
