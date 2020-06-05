import React, { useState, useContext, memo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { SideNavigationContext } from './SideNavigation'

const ActionBarContext = React.createContext({
  isActionBarVisible: false,
  toggleActionBar: () => {}
})

const ActionBarProvider = memo(({ children }) => {
  const [isActionBarVisible, toggleActionBar] = useState(false)

  return (
    <ActionBarContext.Provider
      value={{
        isActionBarVisible,
        toggleActionBar
      }}
    >
      { children }
    </ActionBarContext.Provider>
  )
})

ActionBarProvider.propTypes = {
  children: PropTypes.node.isRequired
}

const ActionBar = () => {
  const { isSideNavigationVisible } = useContext(SideNavigationContext)
  return (
    <div
      id='action-bar-render'
      className={classNames({
        'visible': !isSideNavigationVisible,
        'invisible': isSideNavigationVisible
      })}
    />
  )
}

export {
  ActionBarProvider,
  ActionBarContext
}
export default memo(ActionBar)
