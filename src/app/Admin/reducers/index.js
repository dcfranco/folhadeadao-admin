// @flow
import { combineReducers } from 'redux'

import sellers from './sellers'
import salesFunnel from './sales-funnel'
import users from './users'
import questions from './questions'
import domains from './domains'
import domainTypes from './domain-types'

export default combineReducers<any, any>({
  domainTypes,
  domains,
  questions,
  sellers,
  salesFunnel,
  users
})
