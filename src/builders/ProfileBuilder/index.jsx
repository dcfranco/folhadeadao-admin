// @flow
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { EProfileTypes } from 'constants/profile'

import RoutesBuilder from 'builders/RoutesBuilder'
import Permissions from 'components/Permissions'
import ThemeRender from 'components/ThemeRender'

import type { TProfileKeys } from 'constants/profile'
import type { TRoute, TProfile, TProfileInstance } from 'types'

function ProfileBuilder(profile: TProfile, id: TProfileKeys): TProfileInstance {
  const { route, permissions, theme, routes, component: Container } = profile
  const parent: TRoute = {
    route: profile.route,
    name: profile.name,
    routes: profile.routes,
    permissions: profile.permissions,
    parent: profile
  }

  const rootPath = profile.type === EProfileTypes.DEFAULT ? '' : route

  const tst = RoutesBuilder({
    parent,
    rootPath,
    routes,
    profile,
    id
  })

  const element = (
    <Route path={route}>
      <Permissions permissions={permissions}>
        <ThemeRender theme={theme}>
          <Container profile={profile}>
            <Switch>
              { tst }
            </Switch>
          </Container>
        </ThemeRender>
      </Permissions>
    </Route>
  )

  const ProfileInstance: TProfileInstance = {
    id,
    profile,
    element
  }

  return ProfileInstance
}

export default ProfileBuilder
