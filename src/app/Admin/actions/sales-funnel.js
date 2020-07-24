import { appLoadSpinner, appUnloadSpinner } from 'core/actions/app'

export const SALES_FUNNELS_ASYNC_SUCCESS = 'ADMIN/SALES_FUNNELS_ASYNC_SUCCESS'
export const SALES_FUNNEL_ASYNC_SUCCESS = 'ADMIN/SALES_FUNNEL_ASYNC_SUCCESS'
export const SALES_FUNNEL_RESET_SELECTED = 'ADMIN/SALES_FUNNEL_RESET_SELECTED'
export const SALES_FUNNELS_ASYNC_FAIL = 'ADMIN/SALES_FUNNELS_ASYNC_FAIL'
export const SALES_FUNNELS_UPDATE_PAGE = 'ADMIN/SALES_FUNNELS_UPDATE_PAGE'
export const SALES_FUNNELS_UPDATE_FILTERS = 'ADMIN/SALES_FUNNELS_UPDATE_FILTERS'
export const SALES_FUNNEL_CREATE_SUCCESS = 'ADMIN/SALES_FUNNEL_CREATE_SUCCESS'
export const SALES_FUNNEL_DELETE_SUCCESS = 'ADMIN/SALES_FUNNEL_DELETE_SUCCESS'

function salesFunnelsAsyncSuccess(salesFunnels) {
  return {
    type: SALES_FUNNELS_ASYNC_SUCCESS,
    payload: salesFunnels
  }
}

function salesFunnelAsyncSuccess(salesFunnels) {
  return {
    type: SALES_FUNNEL_ASYNC_SUCCESS,
    payload: salesFunnels
  }
}

function salesFunnelsAsyncFail(error) {
  return {
    type: SALES_FUNNELS_ASYNC_FAIL,
    payload: error
  }
}

function salesFunnelCreateSuccess(salesFunnel) {
  return {
    type: SALES_FUNNEL_CREATE_SUCCESS,
    payload: salesFunnel
  }
}

export function salesFunnelResetSelected() {
  return {
    type: SALES_FUNNEL_RESET_SELECTED
  }
}

export function salesFunnelsUpdatePage(page) {
  return {
    type: SALES_FUNNELS_UPDATE_PAGE,
    payload: page
  }
}

export function salesFunnelsUpdateFilters(search) {
  return {
    type: SALES_FUNNELS_UPDATE_FILTERS,
    payload: {
      search
    }
  }
}

export function salesFunnelsAsyncRequest() {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    const { salesFunnel } = getState().admin
    const options = salesFunnel.get('options')
    const offset = options.get('currentPageIndex') * options.get('limit')

    try {
      const response = await service.api({
        path: '/funnels',
        method: 'GET',
        force: true,
        queryParams: {
          limit: options.get('limit'),
          offset
        },
        body: null
      })

      await dispatch(salesFunnelsAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(salesFunnelsAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function salesFunnelAsyncRequest(salesFunnelId, force = false) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/funnels/:salesFunnelId',
        method: 'GET',
        force,
        pathParams: {
          salesFunnelId
        },
        queryParams: {
          include: [{
            relation: 'questions',
            scope: {
              order: ['order']
            }
          }]
        }
      })

      await dispatch(salesFunnelAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(salesFunnelsAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function salesFunnelEditRequest(salesFunnelId, salesFunnel) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/funnels/:salesFunnelId',
        method: 'PATCH',
        pathParams: {
          salesFunnelId
        },
        body: salesFunnel
      })

      await dispatch(salesFunnelCreateSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(salesFunnelsAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}


export function salesFunnelCreateRequest(salesFunnel) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/funnels',
        method: 'POST',
        body: salesFunnel
      })

      await dispatch(salesFunnelCreateSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(salesFunnelsAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}
