// @flow
import Exception from 'models/Exception'
import { REDUX_FORM_SUBMIT, REDUX_FORM_CHANGE, EXCEPTION_SAVE, EXCEPTION_CLEAR, REACT_ROUTER_LOCATION_CHANGE } from 'core/constants/actionsType'

import type { Reducer } from 'redux'
import type { TActionTypes } from 'types/actionsType'
import type { TException, IException, TAction, TSubmitAction, TChangeAction } from 'core/types'

type TState = IException<TException>
const initialState: TState = new Exception()

type TExceptionReducer = {
  [key: TActionTypes]: Reducer<TState, TAction>
}

const actionsMap: TExceptionReducer = {
  [REDUX_FORM_SUBMIT]: (state: TState, action: TSubmitAction): TState => {
    const { meta: { form }, payload: { registeredFields } } = action
    return initialState.set('fields', registeredFields).set('form', form)
  },
  [REDUX_FORM_CHANGE]: (state: TState, action: TChangeAction) => {
    const { meta: { field, form } } = action
    return state.updateFormFieldErrors(field, form)
  },
  [EXCEPTION_SAVE]: (state, action) => {
    const { payload } = action
    return state.throw(payload)
  },
  [EXCEPTION_CLEAR]: () => {
    return initialState
  },
  [REACT_ROUTER_LOCATION_CHANGE]: () => {
    return initialState
  }
}

const exception: Reducer<TState, TAction> = (
  state: TState = initialState,
  action: TAction
) => {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}

export default exception
