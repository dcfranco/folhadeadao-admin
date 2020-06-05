import { Record } from 'immutable'
import BaseList, { toEntityList } from 'base/BaseList'
import User from 'models/User'

import {
  USERS_ASYNC_SUCCESS,
  USER_ASYNC_SUCCESS,
  USERS_ASYNC_FAIL,
  USERS_UPDATE_PAGE,
  USER_RESET_SELECTED
} from 'admin/actions/users'

const UsersOptions = new Record({
  currentPageIndex: 0,
  limit: 16,
  selected: null
})

const UsersFilters = new Record({
  search: null
})

const initialState = new BaseList({
  errorMessage: '',
  count: 0,
  results: toEntityList([], User),
  options: UsersOptions(),
  filters: UsersFilters()
})

const actionsMap = {
  [USER_ASYNC_SUCCESS]: (state, action) => {
    const { payload: user } = action
    const options = state.get('options')
    return state.merge({
      options: options.set('selected', new User(user))
    })
  },
  [USERS_ASYNC_SUCCESS]: (state, action) => {
    const { payload } = action

    return state.merge({
      results: toEntityList(payload, User)
    })
  },
  [USER_RESET_SELECTED]: (state) => {
    const options = state.get('options')
    return state.merge({
      options: options.set('selected', null)
    })
  },
  [USERS_ASYNC_FAIL]: (state, action) => {
    const { payload } = action
    return state.merge({
      errorMessage: payload
    })
  },
  [USERS_UPDATE_PAGE]: (state, action) => {
    const { payload: page } = action
    const options = state.get('options')
    return state.merge({
      options: options.set('currentPageIndex', page)
    })
  }
}

export default function users(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
