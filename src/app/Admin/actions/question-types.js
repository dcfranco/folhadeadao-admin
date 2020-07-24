import { appLoadSpinner, appUnloadSpinner } from 'core/actions/app'

export const QUESTION_TYPES_ASYNC_SUCCESS = 'ADMIN/QUESTION_TYPES_ASYNC_SUCCESS'
export const QUESTION_TYPES_ASYNC_FAIL = 'ADMIN/QUESTION_TYPES_ASYNC_FAIL'

function questionTypesAsyncSuccess(questionTypes) {
  return {
    type: QUESTION_TYPES_ASYNC_SUCCESS,
    payload: questionTypes
  }
}

function questionTypesAsyncFail(error) {
  return {
    type: QUESTION_TYPES_ASYNC_FAIL,
    payload: error
  }
}

export function questionTypesAsyncRequest(force = false) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/types',
        method: 'GET',
        force,
        body: null
      })

      await dispatch(questionTypesAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(questionTypesAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}
