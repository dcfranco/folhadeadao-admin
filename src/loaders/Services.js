/* eslint-disable no-unused-expressions */
// @flow
import axios from 'axios'
import { fromJS } from 'immutable'
import { CONTENT_TYPE, RESPONSE_TYPE } from 'constants/service'
import { EProfileKeys } from 'constants/profile'
import { bindPathParams } from 'helpers'

import type { ResponseType, $AxiosXHR, Axios, $AxiosError } from 'axios'
import type {
  TLoader,
  TServicesLoader,
  TRequestPayload,
  TService,
  TCore
} from 'types'
import type { ContentType } from 'constants/service'

import { ApiUrl } from 'configs'
import { create } from 'core/actions/exception'
import { userLogout } from 'core/actions/user'

function Services(): TLoader<TServicesLoader> {
  const AppCore: TCore = this

  function onError<T, R>(response: $AxiosXHR<T, R>, params: T) {
    const {
      Redux: {
        store: { getState, dispatch }
      },
      History,
      Profile
    }: TCore = AppCore
    const { status, data }: any = response

    const connectionErrors = [502, 503, 504]
    const permissionErrors = [403]
    const notFoundErrors = [400, 404]

    if (connectionErrors.includes(status)) {
      return dispatch(create(505, data, fromJS(params), true))
    }
    if (permissionErrors.includes(status)) {
      return dispatch(create(401, data, fromJS(params), true))
    }
    if (notFoundErrors.includes(status)) {
      return dispatch(create(404, data, fromJS(params)))
    }
    if (status === 401) {
      const isAuthenticated = getState().user.getIn(['options', 'authenticated'])
      if (isAuthenticated) {
        const {
          profile: { pages }
        } = Profile[EProfileKeys.DEFAULT]
        return dispatch(userLogout()).then(() => History.push(pages.LOGIN))
      }

      return dispatch(create(401, data, fromJS(params)))
    }

    if (data) {
      const { sentry, error } = data
      return dispatch(create(500, error, fromJS(params), true, sentry))
    }

    return dispatch(create(500, null, fromJS(params), true))
  }

  const createService = (
    instance: Axios,
    handlingError: boolean = false
  ): TService => {
    return function<T, R> (payload: TRequestPayload<T>): Promise<any> {
      const {
        path,
        pathParams,
        queryParams,
        method,
        body,
        cType,
        rType,
        force
      } = payload

      const headers: Object = {}
      const contentType: ContentType = cType || CONTENT_TYPE.JSON
      const responseType: ResponseType = rType || RESPONSE_TYPE.JSON

      if (contentType !== CONTENT_TYPE.MULTIPART) {
        headers['Content-Type'] = `${contentType}`
      }

      const bindedQuery = queryParams ? `?filter=${encodeURIComponent(JSON.stringify(queryParams))}` : ''
      const bindedPath = bindPathParams<R>(pathParams, path)
      // const transformedBody: T = contentType !== CONTENT_TYPE.JSON ? JSON.stringify(body) : body

      return new Promise(async (resolve, reject) => {
        try {
          const { Cache }: TCore = AppCore
          const endpoint = `${bindedPath}${bindedQuery}`

          const cache = method === 'GET'
            && !force
            && Cache.getCache({
              endpoint,
              responseType
            })
          if (!cache) {
            const response: $AxiosXHR<T, R> = await instance<T, R>({
              method,
              url: endpoint,
              data: body,
              responseType,
              headers
            })

            const { data } = response
            if (method === 'GET') {
              Cache.saveCache({
                endpoint,
                responseType,
                data
              })
            } else {
              Cache.clear()
            }
            resolve(data)
          } else {
            resolve(cache.data)
          }
        } catch (error) {
          if (handlingError && error && error.response) {
            const { response }: $AxiosError<T, R> = error
            const params = method === 'GET' ? pathParams : body
            onError(response, params)
          }
          reject()
        }
      })
    }
  }

  return {
    load: async () => {
      if (!ApiUrl) {
        throw new Error('[SERVICES]: ApiURL not defined')
      }

      const api = await axios.create({
        baseURL: `${ApiUrl}`,
        transformRequest: [
          (data, headers) => {
            const {
              Redux: {
                store: { getState }
              }
            }: TCore = this
            const access: ?string = getState().user.getIn(['options', 'token'])
            if (access && headers) {
              // eslint-disable-next-line no-param-reassign
              headers['Authorization'] = `Bearer ${access}`
            }

            return JSON.stringify(data)
          }
        ]
      })

      return {
        external: createService(axios.create()),
        api: createService(api, true)
      }
    }
  }
}

export default Services
