import React from 'react'
import PropTypes from 'prop-types'
import { AnimatedSwitch } from 'react-router-transition'

const SwitchTransition = ({ children }) => {
  return (
    <AnimatedSwitch
      atEnter={{ opacity: 0 }}
      atLeave={{ opacity: 0 }}
      atActive={{ opacity: 1 }}
      className='route-wrapper'
    >
      { children }
    </AnimatedSwitch>
  )
}

SwitchTransition.propTypes = {
  children: PropTypes.node.isRequired
}

export default React.memo(SwitchTransition)
