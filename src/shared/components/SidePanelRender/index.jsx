import { useState, useContext, useEffect, memo } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { SideNavigationContext } from 'templates/ModuleTemplate/SideNavigation'
import { SideBarContext } from 'templates/ModuleTemplate/SideBar'

const SidePanelRender = memo(({ children }) => {
  const [portal, setPortal] = useState()
  const { toggleHasSidePanel } = useContext(SideNavigationContext)
  const { toggleSideBar } = useContext(SideBarContext)

  useEffect(() => {
    setPortal(document.getElementById('sidepanel-render'))
    toggleHasSidePanel(true)
    return () => {
      setPortal(null)
      toggleHasSidePanel(false)
      toggleSideBar(false)
    }
  }, [])

  useEffect(() => {
    if (portal) {
      toggleSideBar(true)
    }
  }, [portal])

  if (portal) {
    return ReactDOM.createPortal(children, portal)
  }

  return null
})

SidePanelRender.propTypes = {
  children: PropTypes.node.isRequired
}

export default SidePanelRender
