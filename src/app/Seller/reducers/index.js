// @flow
import { combineReducers } from 'redux'

import funnels from './funnels'
import userClients from './userClients'
import reports from './reports'

export default combineReducers<any, any>({
  funnels,
  userClients,
  reports
})
