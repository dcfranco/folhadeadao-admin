// @flow
import type { REDUX_FORM_SUBMIT, REDUX_FORM_CHANGE } from 'types/actionsType'

type TActionBase = {
  type: string,
  meta?: any,
  payload?: any,
  error?: any
}

export type TSubmitAction = {
  type: REDUX_FORM_SUBMIT,
  meta: {
    form: string
  },
  payload: {
    registeredFields: Object,
  }
} & TActionBase

export type TChangeAction = {
  type: REDUX_FORM_CHANGE,
  meta: {
    form: string,
    field: string,
    touch: ?boolean,
    persistentSubmitErrors: ?boolean
  },
  payload: any
} & TActionBase

export type TReduxFormAction = TSubmitAction | TChangeAction
