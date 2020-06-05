import { Record } from 'immutable'
import BaseList, { toEntityList } from 'base/BaseList'
import Seller from 'models/Seller'

import {
  SELLERS_ASYNC_SUCCESS,
  SELLER_ASYNC_SUCCESS,
  SELLERS_ASYNC_FAIL,
  SELLERS_UPDATE_PAGE,
  SELLER_RESET_SELECTED
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
  results: toEntityList([], Seller),
  options: SellersOptions(),
  filters: SellersFilters()
})

const actionsMap = {
  [SELLER_ASYNC_SUCCESS]: (state, action) => {
    const { payload: seller } = action
    const options = state.get('options')
    return state.merge({
      options: options.set('selected', new Seller(seller))
    })
  },
  [SELLERS_ASYNC_SUCCESS]: (state, action) => {
    const { payload } = action

    return state.merge({
      results: toEntityList(payload, Seller)
    })
  },
  [SELLER_RESET_SELECTED]: (state) => {
    const options = state.get('options')
    return state.merge({
      options: options.set('selected', null)
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
