import { appLoadSpinner, appUnloadSpinner } from 'core/actions/app'

export const CATEGORY_ASYNC_SUCCESS = 'ADMIN/CATEGORY_ASYNC_SUCCESS'
export const CATEGORY_ASYNC_FAIL = 'ADMIN/CATEGORY_ASYNC_FAIL'

function categoriesAsyncSuccess(categories) {
  return {
    type: CATEGORY_ASYNC_SUCCESS,
    payload: categories
  }
}

function categoriesAsyncFail(error) {
  return {
    type: CATEGORY_ASYNC_FAIL,
    payload: error
  }
}

export function categoriesAsyncRequest(force = false) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/categories',
        method: 'GET',
        force,
        body: null
      })

      await dispatch(categoriesAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(categoriesAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}
