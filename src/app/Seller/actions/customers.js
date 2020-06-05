import { appLoadSpinner, appUnloadSpinner } from 'core/actions/app'

export const CUSTOMERS_ASYNC_SUCCESS = 'SELLER/CUSTOMERS_ASYNC_SUCCESS'
export const CUSTOMER_ASYNC_SUCCESS = 'SELLER/CUSTOMER_ASYNC_SUCCESS'
export const CUSTOMER_RESET_SELECTED = 'SELLER/CUSTOMER_RESET_SELECTED'
export const CUSTOMERS_ASYNC_FAIL = 'SELLER/CUSTOMERS_ASYNC_FAIL'
export const CUSTOMERS_UPDATE_PAGE = 'SELLER/CUSTOMERS_UPDATE_PAGE'
export const CUSTOMERS_UPDATE_FILTERS = 'SELLER/CUSTOMERS_UPDATE_FILTERS'
export const CUSTOMER_CREATE_SUCCESS = 'SELLER/CUSTOMER_CREATE_SUCCESS'
export const CUSTOMER_DELETE_SUCCESS = 'SELLER/CUSTOMER_DELETE_SUCCESS'

function customersAsyncSuccess(customers) {
  return {
    type: CUSTOMERS_ASYNC_SUCCESS,
    payload: customers
  }
}

function customerAsyncSuccess(customers) {
  return {
    type: CUSTOMER_ASYNC_SUCCESS,
    payload: customers
  }
}

function customersAsyncFail(error) {
  return {
    type: CUSTOMERS_ASYNC_FAIL,
    payload: error
  }
}

function customerCreateSuccess(customer) {
  return {
    type: CUSTOMER_CREATE_SUCCESS,
    payload: customer
  }
}

function customerDeleteSuccess() {
  return {
    type: CUSTOMER_DELETE_SUCCESS
  }
}

export function customerResetSelected() {
  return {
    type: CUSTOMER_RESET_SELECTED
  }
}

export function customersUpdatePage(page) {
  return {
    type: CUSTOMERS_UPDATE_PAGE,
    payload: page
  }
}

export function customersUpdateFilters(search) {
  return {
    type: CUSTOMERS_UPDATE_FILTERS,
    payload: {
      search
    }
  }
}

export function customersAsyncRequest(force = false) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    const { customers } = getState().seller
    const options = customers.get('options')
    const offset = options.get('currentPageIndex') * options.get('limit')

    try {
      const response = await service.api({
        path: '/customers',
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

      await dispatch(customersAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(customersAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function customerAsyncRequest(customerId) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/customers/:customerId',
        method: 'GET',
        pathParams: {
          customerId
        },
        queryParams: {
          include: [{
            relation: 'seller'
          }]
        }
      })

      await dispatch(customerAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(customersAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function customerCreateRequest(customer) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/customers',
        method: 'POST',
        body: customer
      })

      await dispatch(customerCreateSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(customersAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function customerEditRequest(customerId, customer) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/customers/:customerId',
        method: 'PUT',
        pathParams: {
          customerId
        },
        body: customer
      })

      await dispatch(customerCreateSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(customersAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function customerDeleteRequest(customerId) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/customers/:customerId',
        method: 'DELETE',
        pathParams: {
          customerId
        }
      })

      await dispatch(customerDeleteSuccess())
      await dispatch(customerResetSelected())
      return response
    } catch (errorMessage) {
      dispatch(customersAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}
