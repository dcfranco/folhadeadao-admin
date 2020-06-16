import { Record } from 'immutable'
import BaseList, { toEntityList } from 'base/BaseList'
import Funnel from 'models/Funnel'

import {
  FUNNELS_ASYNC_SUCCESS,
  FUNNEL_ASYNC_SUCCESS,
  FUNNELS_ASYNC_FAIL,
  FUNNELS_UPDATE_PAGE,
  FUNNEL_RESET_SELECTED
} from 'seller/actions/funnels'

const FunnelsOptions = new Record({
  currentPageIndex: 0,
  limit: 16,
  selected: null
})

const FunnelsFilters = new Record({
  search: null
})

const initialState = new BaseList({
  errorMessage: '',
  count: 0,
  results: toEntityList([], Funnel),
  options: FunnelsOptions(),
  filters: FunnelsFilters()
})

const actionsMap = {
  [FUNNEL_ASYNC_SUCCESS]: (state, action) => {
    const { payload: funnel } = action
    const options = state.get('options')
    return state.merge({
      options: options.set('selected', new Funnel(funnel))
    })
  },
  [FUNNELS_ASYNC_SUCCESS]: (state, action) => {
    const { payload: { data, count } } = action

    return state.merge({
      count,
      results: toEntityList(data, Funnel)
    })
  },
  [FUNNEL_RESET_SELECTED]: (state) => {
    const options = state.get('options')
    return state.merge({
      options: options.set('selected', null)
    })
  },
  [FUNNELS_ASYNC_FAIL]: (state, action) => {
    const { payload } = action
    return state.merge({
      errorMessage: payload
    })
  },
  [FUNNELS_UPDATE_PAGE]: (state, action) => {
    const { payload: page } = action
    const options = state.get('options')
    return state.merge({
      options: options.set('currentPageIndex', page)
    })
  }
}

export default function funnels(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
