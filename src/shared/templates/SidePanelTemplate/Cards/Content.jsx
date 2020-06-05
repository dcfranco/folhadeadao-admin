import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const SidePanelCardContent = ({ title, subtitle, children }) => {
  return (
    <Fragment>
      <span className='d-block text-small mb-1'>{title}</span>
      <span className='d-block title'>{subtitle}</span>
      { children }
    </Fragment>
  )
}

SidePanelCardContent.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node
}

SidePanelCardContent.defaultProps = {
  title: '',
  subtitle: '',
  children: null
}

export default React.memo(SidePanelCardContent)
