/* eslint-disable no-use-before-define */
// @flow
import type { TProfileTypes } from 'constants/profile'
import type { Element, ComponentType } from 'react'
import type { Permission } from 'constants/permission'
import type { TRoutes } from 'types'

export type TProfileLogo = {|
  svg?: string,
  image?: string,
  className?: string,
|}

export type TPages = {
  [key: string]: string,
}

export type TProfile = {
  name: string,
  route: string,
  theme: string,
  type: TProfileTypes,
  component: TProfileComponent<TProfile>,
  permissions?: Array<Permission>,
  routes: TRoutes,
  logo?: TProfileLogo,
  pages: TPages,
  small?: TProfileLogo,
}

export type TProfileComponent<E> = ComponentType<{
  children: any,
  profile: E,
}>

export type TProfileInstance = {|
  id: TProfileTypes,
  profile: TProfile,
  element: Element<ComponentType<{ profile: TProfile, children: Element<any> }>>,
|}

export type TProfileInstances = {
  [key: TProfileTypes]: TProfileInstance,
}
