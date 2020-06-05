/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { get } from 'lodash'

function getPathKeysOf(pages, pathname, parent = '') {
  return Object.keys(pages).reduce((path, key) => {
    const pathFull = parent === '' ? key : `${parent}.routes.${key}`
    if (typeof pages[key] === 'object') {
      const pathsub = getPathKeysOf(pages[key], pathname, pathFull)
      if (pathsub !== '') {
        return pathsub
      }
    }
    if (pages[key] === pathname) {
      return pathFull
    }
    return path
  }, '')
}

function getRouteStructure(pathname, pages, routes) {
  if (pathname && pages && routes) {
    const activePath = getPathKeysOf(pages, pathname)
    const routeObj = get(routes, activePath)
    return routeObj
  }

  return null
}

export default getRouteStructure
