/* eslint-disable no-restricted-syntax */
// @flow
import type { TRoutes, TPages } from 'types'

export default function getPagesFromRoutes(routes: TRoutes, root: string = ''): TPages {
  let pages: TPages = {}
  for (const route of Object.keys(routes)) {
    if (routes[route].routes) {
      const { routes: subRoutes } = routes[route]
      const subPages: TPages = getPagesFromRoutes(subRoutes, root + routes[route].route)
      pages = {
        ...pages,
        [route]: subPages
      }
    } else {
      pages = {
        ...pages,
        [route]: `${root}${routes[route].route}`
      }
    }
  }
  return pages
}
