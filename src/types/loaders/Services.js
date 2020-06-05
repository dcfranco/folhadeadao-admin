/* eslint-disable no-use-before-define */
// @flow
import type { Method, ResponseType } from 'axios'
import type { ContentType } from 'constants/service'

export type TRequestParams = {
  [key: string]: string
} & Object

export type TRequestPayload<T> = {|
  path: string,
  pathParams?: TRequestParams,
  queryParams?: TRequestParams,
  method: Method,
  body?: T,
  cType?: ContentType,
  rType?: ResponseType,
  force?: boolean,
|}

export type TService = <T, R>(payload: TRequestPayload<T>) => Promise<R>

export type TServicesLoader = {
  external: TService,
  apiV2: TService,
  apiV3: TService
}
