/* eslint-disable no-param-reassign */
// @flow
import React from 'react'
import { Route, Switch } from 'react-router-dom'

import MetaTags from 'components/MetaTags'
import Permissions from 'components/Permissions'
import DefaultContainer from 'components/DefaultContainer'

import type { TProfile, TRoutes, TRoute } from 'types'

import type { Node } from 'react'

type TRoutesBuilderProps = {
  rootPath: string,
  routes?: TRoutes,
  parent: TRoute,
  profile: TProfile,
  id: string,
}
function RoutesBuilder({ rootPath, routes, parent, profile, id }: TRoutesBuilderProps) {
  const { name } = parent

  if (!routes) {
    return null
  }

  return Object.keys(routes).reverse().map<Node>((key) => {
    const route = routes[key]
    const { route: url } = route
    const path = `${rootPath}${url}`

    if (route.routes && typeof route.routes === 'object') {
      const cId = `${id}>${key}`
      const Container = route.component || DefaultContainer

      return (
        <Route path={path} key={cId}>
          <Permissions permissions={route.permissions}>
            <Container
              route={route}
              parent={parent}
              profile={profile}
            >
              <Switch>
                { RoutesBuilder({
                  rootPath: path,
                  routes: route.routes,
                  parent: {
                    ...route,
                    parent
                  },
                  profile,
                  id: cId
                }) }
              </Switch>
            </Container>
          </Permissions>
        </Route>
      )
    }

    if (route.component) {
      const Page = route.component
      if (route.isFeedback) {
        return (
          <Route exact path={path} key={rootPath + key}>
            <Permissions permissions={route.permissions}>
              <MetaTags
                metaTitle={route.name}
                metaTitleSuffix={name}
              />
              <Page
                parent={parent}
                route={route}
                profile={profile}
              />
            </Permissions>
          </Route>
        )
      }

      return (
        <Route exact path={path} key={rootPath + key}>
          <Permissions permissions={route.permissions}>
            <MetaTags
              metaTitle={route.name}
              metaTitleSuffix={name}
            />
            <Page
              route={route}
              parent={parent}
              profile={profile}
            />
          </Permissions>
        </Route>
      )
    }

    return null
  })
}

export default RoutesBuilder
