// @flow
import { combineReducers } from 'redux'

import funnels from './funnels'
import customers from './customers'
import reports from './reports'

export default combineReducers<any, any>({
  funnels,
  customers,
  reports
})
