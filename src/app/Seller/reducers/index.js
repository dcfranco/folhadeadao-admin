// @flow
import { combineReducers } from 'redux'

import funnels from './funnels'
import customers from './customers'

export default combineReducers<any, any>({
  funnels,
  customers
})
