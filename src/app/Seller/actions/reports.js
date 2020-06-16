import { appLoadSpinner, appUnloadSpinner } from 'core/actions/app'

export const REPORT_SELLER_ASYNC_SUCCESS = 'SELLER/REPORT_SELLER_ASYNC_SUCCESS'
export const REPORT_SELLER_ASYNC_FAIL = 'SELLER/REPORT_SELLER_ASYNC_FAIL'

function reportSellerAsyncSuccess(sellers) {
  return {
    type: REPORT_SELLER_ASYNC_SUCCESS,
    payload: sellers
  }
}

function reportSellerAsyncFail(error) {
  return {
    type: REPORT_SELLER_ASYNC_FAIL,
    payload: error
  }
}

export function reportSellerAsyncRequest(sellerId, force = true) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/sellers/:sellerId/funnel-tokens',
        method: 'GET',
        force,
        pathParams: {
          sellerId
        },
        body: null
      })

      await dispatch(reportSellerAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(reportSellerAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}
