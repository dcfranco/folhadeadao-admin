import { appLoadSpinner, appUnloadSpinner } from 'core/actions/app'

export const USERS_ASYNC_SUCCESS = 'ADMIN/USERS_ASYNC_SUCCESS'
export const USER_ASYNC_SUCCESS = 'ADMIN/USER_ASYNC_SUCCESS'
export const USER_RESET_SELECTED = 'ADMIN/USER_RESET_SELECTED'
export const USERS_ASYNC_FAIL = 'ADMIN/USERS_ASYNC_FAIL'
export const USERS_UPDATE_PAGE = 'ADMIN/USERS_UPDATE_PAGE'
export const USERS_UPDATE_FILTERS = 'ADMIN/USERS_UPDATE_FILTERS'
export const USER_CREATE_SUCCESS = 'ADMIN/USER_CREATE_SUCCESS'
export const USER_DELETE_SUCCESS = 'ADMIN/USER_DELETE_SUCCESS'

function usersAsyncSuccess(users) {
  return {
    type: USERS_ASYNC_SUCCESS,
    payload: users
  }
}

function userAsyncSuccess(users) {
  return {
    type: USER_ASYNC_SUCCESS,
    payload: users
  }
}

function usersAsyncFail(error) {
  return {
    type: USERS_ASYNC_FAIL,
    payload: error
  }
}

function userCreateSuccess(user) {
  return {
    type: USER_CREATE_SUCCESS,
    payload: user
  }
}

export function userResetSelected() {
  return {
    type: USER_RESET_SELECTED
  }
}

export function usersUpdatePage(page) {
  return {
    type: USERS_UPDATE_PAGE,
    payload: page
  }
}

export function usersUpdateFilters(search) {
  return {
    type: USERS_UPDATE_FILTERS,
    payload: {
      search
    }
  }
}

export function usersAsyncRequest() {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    const { users } = getState().admin
    const options = users.get('options')
    const offset = options.get('currentPageIndex') * options.get('limit')
    const user = getState().user.getIn(['options', 'userAdmin'])

    try {
      const response = await service.api({
        path: '/admins/:adminId/clients',
        method: 'GET',
        force: true,
        pathParams: {
          adminId: user.get('ID')
        },
        queryParams: {
          limit: options.get('limit'),
          offset
        },
        body: null
      })

      await dispatch(usersAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(usersAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function userAsyncRequest(userId) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/user-clients/:userId',
        method: 'GET',
        pathParams: {
          userId
        }
      })

      await dispatch(userAsyncSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(usersAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function userEditRequest(adminId, userId, user) {
  return async (dispatch, getState, service) => {
    dispatch(appLoadSpinner())

    try {
      const response = await service.api({
        path: '/admins/:adminId/clients/:adminId',
        method: 'PATCH',
        pathParams: {
          adminId,
          userId
        },
        body: user
      })

      await dispatch(userCreateSuccess(response))
      return response
    } catch (errorMessage) {
      dispatch(usersAsyncFail(errorMessage))
      return null
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}
