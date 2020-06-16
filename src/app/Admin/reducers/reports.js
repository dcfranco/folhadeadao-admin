import BaseList, { toEntityList } from 'base/BaseList'
import Seller from 'models/Seller'

import {
  REPORT_SELLERS_ASYNC_SUCCESS,
  REPORT_SELLERS_ASYNC_FAIL
} from 'admin/actions/reports'

const initialState = new BaseList({
  errorMessage: '',
  count: 0,
  results: toEntityList([], Seller)
})

const actionsMap = {
  [REPORT_SELLERS_ASYNC_SUCCESS]: (state, action) => {
    const { payload } = action

    return state.merge({
      results: toEntityList(payload, Seller)
    })
  },
  [REPORT_SELLERS_ASYNC_FAIL]: (state, action) => {
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
