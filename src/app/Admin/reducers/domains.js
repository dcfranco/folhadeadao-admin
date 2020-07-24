import { Record } from 'immutable'
import BaseList, { toEntityList } from 'base/BaseList'
import Domain from 'models/Domain'

import {
  DOMAINS_ASYNC_SUCCESS,
  DOMAIN_ASYNC_SUCCESS,
  DOMAINS_ASYNC_FAIL,
  DOMAINS_UPDATE_PAGE,
  DOMAIN_RESET_SELECTED,
  DOMAIN_CREATE_SUCCESS
} from 'admin/actions/domains'

const DomainsOptions = new Record({
  currentPageIndex: 0,
  limit: 16,
  selected: null
})

const DomainsFilters = new Record({
  search: null
})

const initialState = new BaseList({
  errorMessage: '',
  count: 0,
  results: toEntityList([], Domain),
  options: DomainsOptions(),
  filters: DomainsFilters()
})

const actionsMap = {
  [DOMAIN_CREATE_SUCCESS]: (state, action) => {
    const { payload: dom } = action
    const options = state.get('options')
    return state.merge({
      options: options.set('selected', new Domain(dom))
    })
  },
  [DOMAIN_ASYNC_SUCCESS]: (state, action) => {
    const { payload: dom } = action
    const options = state.get('options')
    return state.merge({
      options: options.set('selected', new Domain(dom))
    })
  },
  [DOMAINS_ASYNC_SUCCESS]: (state, action) => {
    const { payload } = action

    return state.merge({
      results: toEntityList(payload, Domain)
    })
  },
  [DOMAIN_RESET_SELECTED]: (state) => {
    const options = state.get('options')
    return state.merge({
      options: options.set('selected', null)
    })
  },
  [DOMAINS_ASYNC_FAIL]: (state, action) => {
    const { payload } = action
    return state.merge({
      errorMessage: payload
    })
  },
  [DOMAINS_UPDATE_PAGE]: (state, action) => {
    const { payload: page } = action
    const options = state.get('options')
    return state.merge({
      options: options.set('currentPageIndex', page)
    })
  }
}

export default function domains(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
