/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { get } from 'lodash'

import useStructure from './useStructure'

function getPathKeysOf(pages, pathname, parent = '') {
  return Object.keys(pages).reduce((path, key) => {
    const pathFull = parent === '' ? key : `${parent}.routes.${key}`
    if (typeof pages[key] === 'object') {
      const pathsub = getPathKeysOf(pages[key], pathname, pathFull)
      if (pathsub !== '') {
        return pathsub
      }
    }

    const route = pages[key]
    if (typeof route === 'string' && route.includes('/:')) {
      const routeSplit = route.split('/')
      const pathSplit = pathname.split('/')
      if (routeSplit.length === pathSplit.length) {
        const params = routeSplit.reduce((p, r, i) => {
          if (p === null || p !== false) {
            const isParam = r.charAt(0) === ':'
            if (isParam) {
              return {
                ...p,
                [r.slice(1)]: pathSplit[i]
              }
            }
            if (r !== pathSplit[i]) {
              return false
            }
          }

          return p
        }, null)
        if (params) {
          return {
            params,
            pathFull
          }
        }
      }
    }

    if (pages[key] === pathname) {
      return pathFull
    }
    return path
  }, '')
}

function useActiveRoute() {
  const lastPathname = useRef()
  const lastActiveRoute = useRef()

  const structure = useStructure()
  const location = useLocation()

  const { pathname } = location

  if (pathname !== lastPathname.current) {
    lastPathname.current = pathname
    const { pages, routes } = structure
    const retn = getPathKeysOf(pages, pathname)
    const activePath = typeof retn === 'object' ? retn.pathFull : retn
    const routeObj = get(routes, activePath)
    const page = get(pages, activePath.split('.routes').join(''))
    lastActiveRoute.current = {
      ...routeObj,
      path: activePath,
      page,
      params: typeof retn === 'object' ? retn.params : null
    }
  }

  return lastActiveRoute.current
}

export default useActiveRoute
