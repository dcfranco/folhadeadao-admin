import { appLoadSpinner, appUnloadSpinner } from 'core/actions/app'

export const CUSTOMERS_ASYNC_SUCCESS = 'SELLER/CUSTOMERS_ASYNC_SUCCESS'
export const CUSTOMER_ASYNC_SUCCESS = 'SELLER/CUSTOMER_ASYNC_SUCCESS'
export const CUSTOMER_RESET_SELECTED = 'SELLER/CUSTOMER_RESET_SELECTED'
export const CUSTOMERS_ASYNC_FAIL = 'SELLER/CUSTOMERS_ASYNC_FAIL'
export const CUSTOMERS_UPDATE_PAGE = 'SELLER/CUSTOMERS_UPDATE_PAGE'
export const CUSTOMERS_UPDATE_FILTERS = 'SELLER/CUSTOMERS_UPDATE_FILTERS'
export const CUSTOMER_CREATE_SUCCESS = 'SELLER/CUSTOMER_CREATE_SUCCESS'
export const CUSTOMER_DELETE_SUCCESS = 'SELLER/CUSTOMER_DELETE_SUCCESS'

function userClientsAsyncSuccess(userClients) {
  return {
    type: CUSTOMERS_ASYNC_SUCCESS,
    payload: userClients
  }
}

function userClientAsyncSuccess(userClients) {
  return {
    type: CUSTOMER_ASYNC_SUCCESS,
    payload: userClients
  }
}

function userClientsAsyncFail(error) {
  return {
    type: CUSTOMERS_ASYNC_FAIL,
    payload: error
  }
}

function userClientCreateSuccess(userClient) {
  return {
    type: CUSTOMER_CREATE_SUCCESS,
    payload: userClient
  }
}

function userClientDeleteSuccess() {
  return {
    type: CUSTOMER_DELETE_SUCCESS
  }
}

export function userClientResetSelected() {
  return {
    type: CUSTOMER_RESET_SELECTED
  }
}

export function userClientsUpdatePage(page) {
  return {
    type: CUSTOMERS_UPDATE_PAGE,
    payload: page
  }
}

export function userClientsUpdateFilters(search) {
  return {
    type: CUSTOMERS_UPDATE_FILTERS,
    payload: {
      search
    }
  }
}

export function userClientsAsyncRequest(force = false) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    const { userClients } = getState().seller
    const options = userClients.get('options')
    const offset = options.get('currentPageIndex') * options.get('limit')

    try {
      const response = await service.api({
        path: '/userClients',
        method: 'GET',
        force,
        queryParams: {
          limit: options.get('limit'),
          offset,
          include: [{
          }]
        },
        body: null
      })

      await dispatch(userClientsAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(userClientsAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function userClientAsyncRequest(userClientId) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/userClients/:userClientId',
        method: 'GET',
        pathParams: {
          userClientId
        },
        queryParams: {
          include: [{
            relation: 'seller'
          }]
        }
      })

      await dispatch(userClientAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(userClientsAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function userClientCreateRequest(userClient) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/userClients',
        method: 'POST',
        body: userClient
      })

      await dispatch(userClientCreateSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(userClientsAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function userClientEditRequest(userClientId, userClient) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/userClients/:userClientId',
        method: 'PUT',
        pathParams: {
          userClientId
        },
        body: userClient
      })

      await dispatch(userClientCreateSuccess(response))
      return true
    } catch (errorMessage) {
      dispatch(userClientsAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function userClientDeleteRequest(userClientId) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/userClients/:userClientId',
        method: 'DELETE',
        pathParams: {
          userClientId
        }
      })

      await dispatch(userClientDeleteSuccess())
      await dispatch(userClientResetSelected())
      return response
    } catch (errorMessage) {
      dispatch(userClientsAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}
