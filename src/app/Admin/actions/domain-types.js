import { appLoadSpinner, appUnloadSpinner } from 'core/actions/app'

export const DOMAIN_TYPES_ASYNC_SUCCESS = 'ADMIN/DOMAIN_TYPES_ASYNC_SUCCESS'
export const DOMAIN_TYPES_ASYNC_FAIL = 'ADMIN/DOMAIN_TYPES_ASYNC_FAIL'

function domainTypesAsyncSuccess(domainTypes) {
  return {
    type: DOMAIN_TYPES_ASYNC_SUCCESS,
    payload: domainTypes
  }
}

function domainTypesAsyncFail(error) {
  return {
    type: DOMAIN_TYPES_ASYNC_FAIL,
    payload: error
  }
}

export function domainTypesAsyncRequest(force = false) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/domain-types',
        method: 'GET',
        force,
        body: null
      })

      await dispatch(domainTypesAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(domainTypesAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}
