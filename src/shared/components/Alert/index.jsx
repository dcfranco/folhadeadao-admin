import React, { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { InfoOutlined, HighlightOff } from '@material-ui/icons'

const Alert = forwardRef((props, ref) => {
  const {
    className,
    children,
    hideClose
  } = props

  const [isVisible, showAlert] = useState(false)

  const show = () => {
    showAlert(true)
  }

  useImperativeHandle(ref, () => ({
    show
  }))

  if (!isVisible) {
    return null
  }

  return (
    <div className={classNames(className)}>
      <InfoOutlined className='alert-icon' />
      <div className='alert-content'>
        { children }
      </div>
      { !hideClose && (<HighlightOff className='alert-close-button' onClick={() => showAlert(false)} />) }
    </div>
  )
})

Alert.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  hideClose: PropTypes.bool
}

Alert.defaultProps = {
  className: 'alert',
  hideClose: false
}

export default Alert
