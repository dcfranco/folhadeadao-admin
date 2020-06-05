// @flow
import { combineReducers } from 'redux'

import sellers from './sellers'
import users from './users'

export default combineReducers<any, any>({
  sellers,
  users
})
