import { appLoadSpinner, appUnloadSpinner } from 'core/actions/app'

export const SELLERS_ASYNC_SUCCESS = 'ADMIN/SELLERS_ASYNC_SUCCESS'
export const SELLER_ASYNC_SUCCESS = 'ADMIN/SELLER_ASYNC_SUCCESS'
export const SELLER_RESET_SELECTED = 'ADMIN/SELLER_RESET_SELECTED'
export const SELLERS_ASYNC_FAIL = 'ADMIN/SELLERS_ASYNC_FAIL'
export const SELLERS_UPDATE_PAGE = 'ADMIN/SELLERS_UPDATE_PAGE'
export const SELLERS_UPDATE_FILTERS = 'ADMIN/SELLERS_UPDATE_FILTERS'
export const SELLER_CREATE_SUCCESS = 'ADMIN/SELLER_CREATE_SUCCESS'
export const SELLER_DELETE_SUCCESS = 'ADMIN/SELLER_DELETE_SUCCESS'

function sellersAsyncSuccess(sellers) {
  return {
    type: SELLERS_ASYNC_SUCCESS,
    payload: sellers
  }
}

function sellerAsyncSuccess(sellers) {
  return {
    type: SELLER_ASYNC_SUCCESS,
    payload: sellers
  }
}

function sellersAsyncFail(error) {
  return {
    type: SELLERS_ASYNC_FAIL,
    payload: error
  }
}

function sellerCreateSuccess(seller) {
  return {
    type: SELLER_CREATE_SUCCESS,
    payload: seller
  }
}

function sellerDeleteSuccess() {
  return {
    type: SELLER_DELETE_SUCCESS
  }
}

export function sellerResetSelected() {
  return {
    type: SELLER_RESET_SELECTED
  }
}

export function sellersUpdatePage(page) {
  return {
    type: SELLERS_UPDATE_PAGE,
    payload: page
  }
}

export function sellersUpdateFilters(search) {
  return {
    type: SELLERS_UPDATE_FILTERS,
    payload: {
      search
    }
  }
}

export function sellersAsyncRequest(force = false) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    const { sellers } = getState().admin
    const options = sellers.get('options')
    const offset = options.get('currentPageIndex') * options.get('limit')
    const search = sellers.getIn(['filters', 'search'])
    const searchObj = search ? {
      or: [
        { name: { like: `%${search}%` } },
        { email: { like: `%${search}%` } }
      ]
    } : {}

    try {
      const response = await service.api({
        path: '/admins',
        method: 'GET',
        force,
        queryParams: {
          limit: options.get('limit'),
          offset,
          where: {
            isSeller: 1,
            ...searchObj
          },
          include: [
            { relation: 'user' },
            { relation: 'userClients' }
          ]
        },
        body: null
      })

      await dispatch(sellersAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(sellersAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function sellerAsyncRequest(sellerId) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/admins/:sellerId',
        method: 'GET',
        pathParams: {
          sellerId
        },
        body: null
      })

      await dispatch(sellerAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(sellersAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function sellerCreateRequest(sellerId, seller) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/admins/:sellerId/user',
        pathParams: {
          sellerId
        },
        method: 'POST',
        body: seller
      })

      await dispatch(sellerCreateSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(sellersAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function sellerEditRequest(sellerId, seller) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.apiV3({
        path: '/users/:sellerId',
        method: 'PUT',
        pathParams: {
          sellerId
        },
        body: seller
      })

      await dispatch(sellerCreateSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(sellersAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function sellerDeleteRequest(sellerId) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      await service.api({
        path: '/admins/:sellerId/user',
        method: 'DELETE',
        pathParams: {
          sellerId
        }
      })

      await dispatch(sellerDeleteSuccess())
      return true
    } catch (errorMessage) {
      dispatch(sellersAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}
