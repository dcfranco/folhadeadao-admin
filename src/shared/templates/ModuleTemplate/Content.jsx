import React, { useRef, useContext, memo, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useRightSwipe, useLeftSwipe } from 'hooks'

import { SideNavigationContext } from './SideNavigation'
import { ActionBarContext } from './ActionBar'

const ContentContext = React.createContext({
  contentRef: null,
  updateContentRef: () => {}
})

const ContentProvider = memo(({ children }) => {
  const [contentRef, updateContentRef] = useState(false)

  return (
    <ContentContext.Provider
      value={{
        contentRef,
        updateContentRef
      }}
    >
      { children }
    </ContentContext.Provider>
  )
})

ContentProvider.propTypes = {
  children: PropTypes.node.isRequired
}

const Content = ({ children }) => {
  const contentRef = useRef()
  const { isActionBarVisible } = useContext(ActionBarContext)
  const { updateContentRef } = useContext(ContentContext)
  const { toggleSideNavigation, isSideNavigationVisible } = useContext(SideNavigationContext)

  useRightSwipe(() => {
    toggleSideNavigation(true)
  }, contentRef)

  useLeftSwipe(() => {
    toggleSideNavigation(false)
  }, contentRef)

  useEffect(() => {
    updateContentRef(contentRef)
  }, [])

  return (
    <div
      className={classNames('d-flex flex-column content', {
        'mb-5': isActionBarVisible && !isSideNavigationVisible
      })}
      ref={contentRef}
    >
      { children }
      <div
        className={classNames('sidebar-overlay', {
          'active': isSideNavigationVisible
        })}
        onClick={() => toggleSideNavigation(false)}
      />
    </div>
  )
}

Content.propTypes = {
  children: PropTypes.node.isRequired
}

export {
  ContentProvider,
  ContentContext
}

export default memo(Content)
