import PropTypes from 'prop-types'
import React from 'react'
import SvgImage from 'components/SvgImage'
import classNames from 'classnames'

const FeedbackLeft = ({ desktopIconName, mobileIconName, children, renderIcon, bgClassName }) => (
  <div className={classNames('feedback-left', bgClassName)}>
    <div className='d-block d-md-none mobile-icon text-center'>
      {renderIcon ? renderIcon() : (
        <SvgImage icon={mobileIconName} />
      )}
    </div>
    <h2 className='d-flex font-weight-regular justify-content-center'>{ children }</h2>
    <div className='d-none d-md-block desktop-icon text-center'>
      {renderIcon ? renderIcon() : (
        <SvgImage icon={desktopIconName} />
      )}
    </div>
  </div>
)

FeedbackLeft.propTypes = {
  children: PropTypes.node.isRequired,
  desktopIconName: PropTypes.string,
  mobileIconName: PropTypes.string,
  bgClassName: PropTypes.string,
  renderIcon: PropTypes.func
}

FeedbackLeft.defaultProps = {
  bgClassName: 'bg-main',
  renderIcon: null,
  desktopIconName: null,
  mobileIconName: null
}

export default FeedbackLeft
