import { Record } from 'immutable'
import BaseList, { toEntityList } from 'base/BaseList'
import UserClient from 'models/UserClient'

import {
  CUSTOMERS_ASYNC_SUCCESS,
  CUSTOMER_ASYNC_SUCCESS,
  CUSTOMERS_ASYNC_FAIL,
  CUSTOMERS_UPDATE_PAGE,
  CUSTOMER_RESET_SELECTED
} from 'seller/actions/userClients'

const UserClientsOptions = new Record({
  currentPageIndex: 0,
  limit: 16,
  selected: null
})

const UserClientsFilters = new Record({
  search: null
})

const initialState = new BaseList({
  errorMessage: '',
  count: 0,
  results: toEntityList([], UserClient),
  options: UserClientsOptions(),
  filters: UserClientsFilters()
})

const actionsMap = {
  [CUSTOMER_ASYNC_SUCCESS]: (state, action) => {
    const { payload: userClient } = action
    const options = state.get('options')
    return state.merge({
      options: options.set('selected', new UserClient(userClient))
    })
  },
  [CUSTOMERS_ASYNC_SUCCESS]: (state, action) => {
    const { payload } = action

    return state.merge({
      results: toEntityList(payload, UserClient)
    })
  },
  [CUSTOMER_RESET_SELECTED]: (state) => {
    const options = state.get('options')
    return state.merge({
      options: options.set('selected', null)
    })
  },
  [CUSTOMERS_ASYNC_FAIL]: (state, action) => {
    const { payload } = action
    return state.merge({
      errorMessage: payload
    })
  },
  [CUSTOMERS_UPDATE_PAGE]: (state, action) => {
    const { payload: page } = action
    const options = state.get('options')
    return state.merge({
      options: options.set('currentPageIndex', page)
    })
  }
}

export default function userClients(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
