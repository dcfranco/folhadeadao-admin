import BaseList, { toEntityList } from 'base/BaseList'
import DomainType from 'models/DomainType'

import {
  DOMAIN_TYPES_ASYNC_SUCCESS,
  DOMAIN_TYPES_ASYNC_FAIL
} from 'admin/actions/domain-types'

const initialState = new BaseList({
  errorMessage: '',
  count: 0,
  results: toEntityList([], DomainType)
})

const actionsMap = {
  [DOMAIN_TYPES_ASYNC_SUCCESS]: (state, action) => {
    const { payload } = action

    return state.merge({
      results: toEntityList(payload, DomainType)
    })
  },
  [DOMAIN_TYPES_ASYNC_FAIL]: (state, action) => {
    const { payload } = action
    return state.merge({
      errorMessage: payload
    })
  }
}

export default function domainTypes(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
