import BaseList, { toEntityList } from 'base/BaseList'
import Funnel from 'models/Funnel'

import {
  REPORT_SELLER_ASYNC_SUCCESS,
  REPORT_SELLER_ASYNC_FAIL
} from 'seller/actions/reports'

const initialState = new BaseList({
  errorMessage: '',
  count: 0,
  results: toEntityList([], Funnel)
})

const actionsMap = {
  [REPORT_SELLER_ASYNC_SUCCESS]: (state, action) => {
    const { payload } = action

    return state.merge({
      results: toEntityList(payload, Funnel)
    })
  },
  [REPORT_SELLER_ASYNC_FAIL]: (state, action) => {
    const { payload } = action
    return state.merge({
      errorMessage: payload
    })
  }
}

export default function reports(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
