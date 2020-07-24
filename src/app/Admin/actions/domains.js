import { appLoadSpinner, appUnloadSpinner } from 'core/actions/app'

export const DOMAINS_ASYNC_SUCCESS = 'ADMIN/DOMAINS_ASYNC_SUCCESS'
export const DOMAIN_ASYNC_SUCCESS = 'ADMIN/DOMAIN_ASYNC_SUCCESS'
export const DOMAIN_RESET_SELECTED = 'ADMIN/DOMAIN_RESET_SELECTED'
export const DOMAINS_ASYNC_FAIL = 'ADMIN/DOMAINS_ASYNC_FAIL'
export const DOMAINS_UPDATE_PAGE = 'ADMIN/DOMAINS_UPDATE_PAGE'
export const DOMAINS_UPDATE_FILTERS = 'ADMIN/DOMAINS_UPDATE_FILTERS'
export const DOMAIN_CREATE_SUCCESS = 'ADMIN/DOMAIN_CREATE_SUCCESS'
export const DOMAIN_DELETE_SUCCESS = 'ADMIN/DOMAIN_DELETE_SUCCESS'

function domainsAsyncSuccess(domains) {
  return {
    type: DOMAINS_ASYNC_SUCCESS,
    payload: domains
  }
}

function domainAsyncSuccess(domains) {
  return {
    type: DOMAIN_ASYNC_SUCCESS,
    payload: domains
  }
}

function domainsAsyncFail(error) {
  return {
    type: DOMAINS_ASYNC_FAIL,
    payload: error
  }
}

export function domainResetSelected() {
  return {
    type: DOMAIN_RESET_SELECTED
  }
}

export function domainsUpdatePage(page) {
  return {
    type: DOMAINS_UPDATE_PAGE,
    payload: page
  }
}

export function domainsUpdateFilters(search) {
  return {
    type: DOMAINS_UPDATE_FILTERS,
    payload: {
      search
    }
  }
}

export function domainsFunnelAsyncRequest(questionId) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/questions/:questionId/domains',
        method: 'GET',
        force: true,
        pathParams: {
          questionId
        },
        body: null
      })

      await dispatch(domainsAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(domainsAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function domainAsyncRequest(domainId) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/domains/:domainId',
        method: 'GET',
        force: true,
        pathParams: {
          domainId
        },
        queryParams: {
          include: [
            { relation: 'domainType' }
          ]
        }
      })

      await dispatch(domainAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(domainsAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function domainEditRequest(domainId, domain) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      await service.api({
        path: '/domains/:domainId',
        method: 'PATCH',
        pathParams: {
          domainId
        },
        body: domain
      })

      const savedDomain = await dispatch(domainAsyncRequest(domainId))
      return savedDomain
    } catch (errorMessage) {
      dispatch(domainsAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}


export function domainCreateRequest(questionId, domain) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/questions/:questionId/domains',
        pathParams: {
          questionId
        },
        method: 'POST',
        body: domain
      })

      const createdDomain = await dispatch(domainAsyncRequest(response.id))
      return createdDomain
    } catch (errorMessage) {
      dispatch(domainsAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}
