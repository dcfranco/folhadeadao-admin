import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import CircularProgress from '@material-ui/core/CircularProgress'
import LinearProgress from '@material-ui/core/LinearProgress'

const Spinner = ({ noOverlay }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div
      className={classNames('app-loading', {
        'no-overlay': noOverlay
      })}
    >
      <div className='app-loading-overlay ' />
      <LinearProgress className='app-loading-line' />
      <CircularProgress color='inherit' className='app-loading-circular' size='50' />
    </div>
  )
}

Spinner.propTypes = {
  noOverlay: PropTypes.bool
}

Spinner.defaultProps = {
  noOverlay: false
}

export default React.memo(Spinner)
