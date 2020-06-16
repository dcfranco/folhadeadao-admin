import { appLoadSpinner, appUnloadSpinner } from 'core/actions/app'

export const FUNNELS_ASYNC_SUCCESS = 'SELLER/FUNNELS_ASYNC_SUCCESS'
export const FUNNEL_ASYNC_SUCCESS = 'SELLER/FUNNEL_ASYNC_SUCCESS'
export const FUNNEL_RESET_SELECTED = 'SELLER/FUNNEL_RESET_SELECTED'
export const FUNNELS_ASYNC_FAIL = 'SELLER/FUNNELS_ASYNC_FAIL'
export const FUNNELS_UPDATE_PAGE = 'SELLER/FUNNELS_UPDATE_PAGE'
export const FUNNELS_UPDATE_FILTERS = 'SELLER/FUNNELS_UPDATE_FILTERS'
export const FUNNEL_CREATE_SUCCESS = 'SELLER/FUNNEL_CREATE_SUCCESS'
export const FUNNEL_DELETE_SUCCESS = 'SELLER/FUNNEL_DELETE_SUCCESS'

function funnelsAsyncSuccess(funnels) {
  return {
    type: FUNNELS_ASYNC_SUCCESS,
    payload: funnels
  }
}

function funnelAsyncSuccess(funnels) {
  return {
    type: FUNNEL_ASYNC_SUCCESS,
    payload: funnels
  }
}

function funnelsAsyncFail(error) {
  return {
    type: FUNNELS_ASYNC_FAIL,
    payload: error
  }
}

function funnelCreateSuccess(funnel) {
  return {
    type: FUNNEL_CREATE_SUCCESS,
    payload: funnel
  }
}

function funnelDeleteSuccess() {
  return {
    type: FUNNEL_DELETE_SUCCESS
  }
}

export function funnelResetSelected() {
  return {
    type: FUNNEL_RESET_SELECTED
  }
}

export function funnelsUpdatePage(page) {
  return {
    type: FUNNELS_UPDATE_PAGE,
    payload: page
  }
}

export function funnelsUpdateFilters(search) {
  return {
    type: FUNNELS_UPDATE_FILTERS,
    payload: {
      search
    }
  }
}

export function funnelsAsyncRequest(sellerId, force = false) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    const { funnels } = getState().seller
    const options = funnels.get('options')
    const offset = options.get('currentPageIndex') * options.get('limit')

    try {
      const response = await Promise.all([
        service.api({
          path: '/funnel-tokens',
          method: 'GET',
          force,
          queryParams: {
            limit: options.get('limit'),
            offset,
            where: {
              sellerId
            },
            include: [{
              relation: 'funnelAnswers'
            },
            {
              relation: 'seller'
            },
            {
              relation: 'customer'
            }]
          },
          body: null
        }),
        service.api({
          path: '/funnel-tokens/count',
          method: 'GET',
          force,
          isCount: true,
          queryParams: {
            sellerId
          },
          body: null
        })
      ])

      const [data, { count }] = response

      await dispatch(funnelsAsyncSuccess({ data, count }))
      return response
    } catch (errorMessage) {
      dispatch(funnelsAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function funnelAsyncRequest(funnelId) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())
    try {
      const response = await service.api({
        path: '/funnel-tokens/:funnelId',
        method: 'GET',
        force: true,
        pathParams: {
          funnelId
        },
        queryParams: {
          include: [{
            relation: 'funnelAnswers'
          },
          {
            relation: 'seller'
          },
          {
            relation: 'customer'
          }]
        }
      })

      await dispatch(funnelAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(funnelsAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function funnelCreateRequest(funnel) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/funnel-tokens',
        method: 'POST',
        body: funnel
      })

      await dispatch(funnelCreateSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(funnelsAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function funnelEditRequest(funnelId, funnel) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/funnel-tokens/:funnelId',
        method: 'PUT',
        pathParams: {
          funnelId
        },
        body: funnel
      })

      await dispatch(funnelCreateSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(funnelsAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function funnelDeleteRequest(funnelId) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      await service.api({
        path: '/funnel-tokens/:funnelId',
        method: 'DELETE',
        pathParams: {
          funnelId
        }
      })

      await dispatch(funnelDeleteSuccess())
      await dispatch(funnelResetSelected())
      return true
    } catch (errorMessage) {
      dispatch(funnelsAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}
