import React, { useLayoutEffect, useState, useContext } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { ActionBarContext } from 'templates/ModuleTemplate/ActionBar'

const ActionBarRender = ({ children }) => {
  const [portal, setPortal] = useState()
  const { toggleActionBar } = useContext(ActionBarContext)

  useLayoutEffect(() => {
    setPortal(document.getElementById('action-bar-render'))
    toggleActionBar(true)
    return () => {
      setPortal(null)
      toggleActionBar(false)
    }
  }, [])

  if (portal) {
    return ReactDOM.createPortal(children, portal)
  }

  return null
}

ActionBarRender.propTypes = {
  children: PropTypes.node.isRequired
}

export default React.memo(ActionBarRender)
