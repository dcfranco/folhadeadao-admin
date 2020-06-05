import React, { useContext, useRef } from 'react'
import classNames from 'classnames'
import { useLeftSwipe, useRightSwipe } from 'hooks'

import { SideBarContext } from './SideBar'
import { SideNavigationContext } from './SideNavigation'

const SidePanel = () => {
  const sidepanelRef = useRef()
  const { isSideBarCollapsed, toggleSideBar } = useContext(SideBarContext)
  const { toggleSideNavigation } = useContext(SideNavigationContext)

  useLeftSwipe(() => {
    toggleSideNavigation(false)
  }, sidepanelRef)

  useRightSwipe(() => {
    toggleSideBar(false)
  }, sidepanelRef)

  return (
    <div
      ref={sidepanelRef}
      className={classNames('sidepanel', {
        'visible': isSideBarCollapsed
      })}
    >
      <div id='sidepanel-render' />
    </div>
  )
}

export default React.memo(SidePanel)
