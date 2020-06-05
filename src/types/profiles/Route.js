/* eslint-disable no-use-before-define */
// @flow
import type { Permission } from 'constants/permission'
import type { TProfile } from 'types/profiles'
import type { ComponentType } from 'react'

export type TRoute = {
  route: string,
  name: string,
  icon?: () => Node,
  permissions?: Array<Permission>,
  isFeedback?: boolean,
  hideMenu?: boolean,
  component?: ComponentType<{
    profile: TProfile,
    route: TRoute,
    parent: TRoute,
    children?: any,
  }>,
  routes?: TRoutes,
  parent?: TRoute | TProfile,
}

export type TRoutes = {
  [key: string]: TRoute,
}
