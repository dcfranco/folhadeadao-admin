import { Record } from 'immutable'
import BaseList, { toEntityList } from 'base/BaseList'
import UserAdmin from 'models/UserAdmin'

import {
  SELLERS_ASYNC_SUCCESS,
  SELLER_ASYNC_SUCCESS,
  SELLERS_ASYNC_FAIL,
  SELLERS_UPDATE_PAGE,
  SELLER_RESET_SELECTED,
  SELLERS_UPDATE_FILTERS
} from 'admin/actions/sellers'

const SellersOptions = new Record({
  currentPageIndex: 0,
  limit: 16,
  selected: null
})

const SellersFilters = new Record({
  search: null
})

const initialState = new BaseList({
  errorMessage: '',
  count: 0,
  results: toEntityList([], UserAdmin),
  options: SellersOptions(),
  filters: SellersFilters()
})

const actionsMap = {
  [SELLER_ASYNC_SUCCESS]: (state, action) => {
    const { payload: seller } = action
    const options = state.get('options')
    return state.merge({
      options: options.set('selected', new UserAdmin(seller))
    })
  },
  [SELLERS_ASYNC_SUCCESS]: (state, action) => {
    const { payload } = action

    return state.merge({
      results: toEntityList(payload, UserAdmin)
    })
  },
  [SELLER_RESET_SELECTED]: (state) => {
    const options = state.get('options')
    return state.merge({
      options: options.set('selected', null)
    })
  },
  [SELLERS_UPDATE_FILTERS]: (state, action) => {
    const { payload: { search } } = action
    const filters = state.get('filters')
    return state.merge({
      filters: filters.set('search', search)
    })
  },
  [SELLERS_ASYNC_FAIL]: (state, action) => {
    const { payload } = action
    return state.merge({
      errorMessage: payload
    })
  },
  [SELLERS_UPDATE_PAGE]: (state, action) => {
    const { payload: page } = action
    const options = state.get('options')
    return state.merge({
      options: options.set('currentPageIndex', page)
    })
  }
}

export default function sellers(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
