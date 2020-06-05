import { fromJS } from 'immutable'
import {
  APP_LOAD_SPINNER,
  APP_UNLOAD_SPINNER
} from 'core/constants/actionsType'

const initialState = fromJS({
  actions: 0,
  spinner: false,
  prevRoute: null,
  route: null
})

const actionsMap = {
  [APP_LOAD_SPINNER]: state => {
    const actions = state.get('actions')

    return state.merge({
      actions: actions + 1,
      spinner: true
    })
  },
  [APP_UNLOAD_SPINNER]: state => {
    const actions = state.get('actions')
    const currentActions = actions - 1

    return state.merge({
      actions: currentActions,
      spinner: currentActions > 0
    })
  }
}

export default function app(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
