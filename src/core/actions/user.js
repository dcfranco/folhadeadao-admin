import { appLoadSpinner, appUnloadSpinner } from 'core/actions/app'

export const USER_ASYNC_SUCCESS = 'CORE/USER_ASYNC_SUCCESS'
export const USER_ASYNC_FAIL = 'CORE/USER_ASYNC_FAIL'
export const USER_SELECT_PROFILE = 'CORE/USER_SELECT_PROFILE'
export const USER_LOGOUT = 'CORE/USER_LOGOUT'

function userAsyncSuccess({ user, token, userAdmin }) {
  return {
    type: USER_ASYNC_SUCCESS,
    user,
    userAdmin,
    token
  }
}

function userAsyncFail(errorMessage) {
  return {
    type: USER_ASYNC_SUCCESS,
    errorMessage
  }
}

export function userLogout() {
  return {
    type: USER_LOGOUT
  }
}

export function userSelectProfile(profile) {
  return {
    type: USER_SELECT_PROFILE,
    profile
  }
}

export function userAsyncRequest(username, password) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/login',
        method: 'POST',
        force: true,
        body: {
          username,
          password
        }
      })

      await dispatch(userAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(userAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function userUpdateInformations() {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/users',
        method: 'POST',
        body: {}
      })
      dispatch(userAsyncSuccess(response))
      return response
    } catch (error) {
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}
