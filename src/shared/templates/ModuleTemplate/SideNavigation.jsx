import React, { useContext, useState, memo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const SideNavigationContext = React.createContext({
  isSideNavigationVisible: false,
  hasSidePanel: false,
  toggleSideNavigation: () => {},
  toggleHasSidePanel: () => {}
})

const SideNavigationProvider = memo(({ children }) => {
  const [isSideNavigationVisible, toggleSideNavigation] = useState(false)
  const [hasSidePanel, toggleHasSidePanel] = useState(false)

  return (
    <SideNavigationContext.Provider
      value={{
        hasSidePanel,
        isSideNavigationVisible,
        toggleSideNavigation,
        toggleHasSidePanel
      }}
    >
      { children }
    </SideNavigationContext.Provider>
  )
})

const SideNavigation = ({ children }) => {
  const { isSideNavigationVisible } = useContext(SideNavigationContext)
  return (
    <div
      className={classNames('side-navigation', {
        'visible': isSideNavigationVisible
      })}
    >
      { children }
    </div>
  )
}

SideNavigation.propTypes = {
  children: PropTypes.node.isRequired
}

SideNavigationProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export {
  SideNavigationProvider,
  SideNavigationContext
}
export default memo(SideNavigation)
