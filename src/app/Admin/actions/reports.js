import { appLoadSpinner, appUnloadSpinner } from 'core/actions/app'

export const REPORT_ADMIN_ASYNC_SUCCESS = 'ADMIN/REPORT_ADMIN_ASYNC_SUCCESS'
export const REPORT_ADMIN_ASYNC_FAIL = 'ADMIN/REPORT_ADMIN_ASYNC_FAIL'

function reportSellersAsyncSuccess(sellers) {
  return {
    type: REPORT_ADMIN_ASYNC_SUCCESS,
    payload: sellers
  }
}

function reportSellersAsyncFail(error) {
  return {
    type: REPORT_ADMIN_ASYNC_FAIL,
    payload: error
  }
}

export function reportSellersAsyncRequest(force = false) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/sellers',
        method: 'GET',
        force,
        queryParams: {
          include: [
            {
              relation: 'user'
            },
            {
              relation: 'funnelTokens'
            }
          ]
        },
        body: null
      })

      await dispatch(reportSellersAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(reportSellersAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}
