import { Record } from 'immutable'
import BaseList, { toEntityList } from 'base/BaseList'
import SalesFunnel from 'models/SalesFunnel'

import {
  SALES_FUNNELS_ASYNC_SUCCESS,
  SALES_FUNNEL_ASYNC_SUCCESS,
  SALES_FUNNELS_ASYNC_FAIL,
  SALES_FUNNELS_UPDATE_PAGE,
  SALES_FUNNEL_RESET_SELECTED,
  SALES_FUNNEL_CREATE_SUCCESS
} from 'admin/actions/sales-funnel'

const SalesFunnelsOptions = new Record({
  currentPageIndex: 0,
  limit: 16,
  selected: null
})

const SalesFunnelsFilters = new Record({
  search: null
})

const initialState = new BaseList({
  errorMessage: '',
  count: 0,
  results: toEntityList([], SalesFunnel),
  options: SalesFunnelsOptions(),
  filters: SalesFunnelsFilters()
})

const actionsMap = {
  [SALES_FUNNEL_CREATE_SUCCESS]: (state, action) => {
    const { payload: funnel } = action
    const options = state.get('options')
    return state.merge({
      options: options.set('selected', new SalesFunnel(funnel))
    })
  },
  [SALES_FUNNEL_ASYNC_SUCCESS]: (state, action) => {
    const { payload: funnel } = action
    const options = state.get('options')
    return state.merge({
      options: options.set('selected', new SalesFunnel(funnel))
    })
  },
  [SALES_FUNNELS_ASYNC_SUCCESS]: (state, action) => {
    const { payload } = action

    return state.merge({
      results: toEntityList(payload, SalesFunnel)
    })
  },
  [SALES_FUNNEL_RESET_SELECTED]: (state) => {
    const options = state.get('options')
    return state.merge({
      options: options.set('selected', null)
    })
  },
  [SALES_FUNNELS_ASYNC_FAIL]: (state, action) => {
    const { payload } = action
    return state.merge({
      errorMessage: payload
    })
  },
  [SALES_FUNNELS_UPDATE_PAGE]: (state, action) => {
    const { payload: page } = action
    const options = state.get('options')
    return state.merge({
      options: options.set('currentPageIndex', page)
    })
  }
}

export default function salesFunnel(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
