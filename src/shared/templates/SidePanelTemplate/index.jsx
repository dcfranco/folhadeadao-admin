import React, { memo } from 'react'
import PropTypes from 'prop-types'

import SidePanelLinks from './Links'
import SidePanelLink from './Link'
import SidePanelTitle from './Title'
import SidePanelHeader from './Header'
import SidePanelBackLink from './BackLink'
import SidePanelAction from './Action'
import SidePanelCards from './Cards'
import SidePanelCard from './Cards/Card'
import SidePanelActions from './Actions'

const Layout = memo(({ children }) => {
  return (
    <div className='sidepanel-template d-flex flex-column'>
      { children }
    </div>
  )
})

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default {
  Layout,
  Link: SidePanelLink,
  Title: SidePanelTitle,
  Links: SidePanelLinks,
  Header: SidePanelHeader,
  BackLink: SidePanelBackLink,
  Actions: SidePanelActions,
  Action: SidePanelAction,
  Cards: SidePanelCards,
  Card: SidePanelCard
}
