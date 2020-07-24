import { appLoadSpinner, appUnloadSpinner } from 'core/actions/app'
import { CONTENT_TYPE } from 'constants/service'

export const UPLOADER_ASYNC_SUCCESS = 'ADMIN/UPLOADER_ASYNC_SUCCESS'
export const UPLOADER_ASYNC_FAIL = 'ADMIN/UPLOADER_ASYNC_FAIL'

function uploaderAsyncSuccess(sellers) {
  return {
    type: UPLOADER_ASYNC_SUCCESS,
    payload: sellers
  }
}

function uploaderAsyncFail(error) {
  return {
    type: UPLOADER_ASYNC_FAIL,
    payload: error
  }
}

export function uploaderAsyncRequest(form) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/uploader',
        method: 'POST',
        body: form,
        cType: CONTENT_TYPE.MULTIPART
      })

      await dispatch(uploaderAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(uploaderAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}
