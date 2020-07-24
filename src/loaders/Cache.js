// @flow
import { List } from 'immutable'
import type { TLoader, TCache, TCacheLoader, TGetCachePayload, TSaveCachePayload } from 'types'
import moment from 'moment'
import { CacheMinutes } from 'configs'

function Cache(): TLoader<TCacheLoader> {
  let caches: List<TCache> = new List<TCache>()

  const clear = (): void => {
    caches = new List()
  }

  const getCache = (payload: TGetCachePayload): ?TCache => {
    const date = moment()
    const cache = caches.find((item: TCache) => {
      const isUpdated = date.diff(item.lastUpdate, 'minutes')
      if (item.endpoint === payload.endpoint
      && item.responseType === payload.responseType
      && isUpdated <= CacheMinutes) {
        return true
      }
      return false
    })
    return cache
  }

  const saveCache = (payload: TSaveCachePayload): ?TCache => {
    const cacheInx = caches.findIndex((item: TCache) => {
      if (item.endpoint === payload.endpoint
      && item.responseType === payload.responseType) {
        return true
      }
      return false
    })
    if (cacheInx >= 0) {
      caches = caches.map<TCache>((cache, i) => {
        if (i === cacheInx) {
          return {
            ...cache,
            data: payload.data,
            lastUpdate: moment()
          }
        }
        return cache
      })
    } else {
      caches = caches.push({
        ...payload,
        lastUpdate: moment()
      })
    }
  }

  return {
    load: async () => {
      return {
        getCache,
        saveCache,
        clear
      }
    }
  }
}

export default Cache
