import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import PropTypes from 'prop-types'

const CircularProgressBar = ({ percentage, Icon }) => {
  return (
    <div className='progress-bar-component'>
      <CircularProgressbar
        percentage={percentage}
      />
      { Icon && (
        <div className='icon'>
          <Icon className='text-company align-self-center mr-md-2' />
        </div>
      ) }
    </div>
  )
}

CircularProgressBar.propTypes = {
  percentage: PropTypes.number,
  Icon: PropTypes.func
}

CircularProgressBar.defaultProps = {
  percentage: 0,
  Icon: null
}

export default React.memo(CircularProgressBar)
