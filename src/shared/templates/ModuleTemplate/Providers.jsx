import React from 'react'
import PropTypes from 'prop-types'

import { SideBarProvider } from './SideBar'
import { SideNavigationProvider } from './SideNavigation'
import { ActionBarProvider } from './ActionBar'
import { ContentProvider } from './Content'

const Providers = ({ children }) => {
  return (
    <div className='module-template'>
      <SideNavigationProvider>
        <SideBarProvider>
          <ActionBarProvider>
            <ContentProvider>
              { children }
            </ContentProvider>
          </ActionBarProvider>
        </SideBarProvider>
      </SideNavigationProvider>
    </div>
  )
}

Providers.propTypes = {
  children: PropTypes.node.isRequired
}

export default React.memo(Providers)
