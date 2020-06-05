// @flow
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form/immutable'

import admin from 'admin/reducers'
import seller from 'seller/reducers'

import app from 'core/reducers/app'
import errors from 'core/reducers/exception'
import user from 'core/reducers/user'

const coreState = combineReducers<any, any>({
  admin,
  seller,

  app,
  errors,
  user,

  form: formReducer
})

export default coreState
