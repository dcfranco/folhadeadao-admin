import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useStructure, useActiveRoute } from 'hooks'
import { EProfileTypes } from 'constants/profile'

import Header from './Header'
import Content from './Content'
import SideBar from './SideBar'
import SidePanel from './SidePanel'
import Providers from './Providers'
import SideNavigation from './SideNavigation'
import ActionBar from './ActionBar'

const Layout = ({ children }) => {
  const structure = useStructure()
  const activeRoute = useActiveRoute()

  useEffect(() => {
    document.body.style.backgroundColor = '#f0f1f4'
  }, [])

  if (structure.type !== EProfileTypes.MODULE) {
    return null
  }

  if (activeRoute && activeRoute.isFeedback) {
    return (
      <Fragment>
        { children }
      </Fragment>
    )
  }

  return (
    <Fragment>
      <Providers>
        <SideNavigation>
          <SideBar />
          <SidePanel />
        </SideNavigation>
        <Content>
          <Header />
          <main role='main'>
            { children }
          </main>
        </Content>
        <ActionBar />
      </Providers>
    </Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default {
  Layout: React.memo(Layout)
}
