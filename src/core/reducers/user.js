/* eslint-disable camelcase */
import User from 'models/User'
import UserAdmin from 'models/UserAdmin'
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
  selectedProfile: null,
  userAdmin: null
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

    const { user: us, userAdmin } = action
    return state.merge({
      data: new User({ ...us }, userAdmin && userAdmin.isSeller === 1),
      options: options
        .set('authenticated', true)
        .set('token', action.token)
        .set('userAdmin', userAdmin && new UserAdmin(userAdmin))
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
