/* eslint-disable camelcase */
import User from 'models/User'
import Base from 'base/Base'
import UserProfile from 'models/UserProfile'
import { Record } from 'immutable'

import {
  USER_ASYNC_SUCCESS,
  USER_ASYNC_FAIL,
  USER_SELECT_PROFILE,
  USER_LOGOUT
} from 'core/actions/user'

const REHYDRATE = 'persist/REHYDRATE'

const UserOptions = new Record({
  authenticated: false,
  token: null,
  selectedProfile: null
})

const initialState = new Base({
  errorMessage: '',
  data: new User({}),
  options: UserOptions()
})

const actionsMap = {
  [USER_ASYNC_SUCCESS]: (state, action) => {
    const options = state.get('options')
    if (!action) {
      return state
    }
    return state.merge({
      data: new User({ ...action.user, seller: action.seller }),
      options: options
        .set('authenticated', true)
        .set('token', action.token)
    })
  },
  [USER_ASYNC_FAIL]: (state, action) => {
    const { errorMessage } = action
    return state.merge({
      errorMessage
    })
  },
  [USER_SELECT_PROFILE]: (state, action) => {
    const { profile } = action
    const options = state.get('options')
    return state.merge({
      options: options.set('selectedProfile', profile)
    })
  },
  [REHYDRATE]: (state, action) => {
    const { payload } = action
    const userPayload = payload ? payload.user : null
    if (userPayload) {
      const { selectedProfile } = userPayload.options
      const options = UserOptions(userPayload.options)
      return new Base({
        errorMessage: userPayload.errorMessage,
        data: new User(userPayload.data),
        options: selectedProfile ? options.set('selectedProfile', new UserProfile(selectedProfile)) : options
      })
    }
    return initialState
  },
  [USER_LOGOUT]: () => {
    return initialState
  }
}

export default function user(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
