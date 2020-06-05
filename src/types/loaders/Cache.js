/* eslint-disable no-use-before-define */
// @flow
import type Moment from 'moment'
import type { ResponseType } from 'axios'

export type TCache = {
  lastUpdate: Moment,
  endpoint: string,
  responseType: ResponseType,
  data: any,
}

export type TGetCachePayload = {
  endpoint: string,
  responseType: ResponseType,
}

export type TSaveCachePayload = {
  endpoint: string,
  responseType: ResponseType,
  data: any,
}

export type TCacheLoader = {
  getCache(payload: TGetCachePayload): ?TCache,
  saveCache(payload: TSaveCachePayload): void,
  clear(): void,
}
