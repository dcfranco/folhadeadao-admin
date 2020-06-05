// @flow
import {
  APP_LOAD_SPINNER,
  APP_UNLOAD_SPINNER
} from 'core/constants/actionsType'
import type { TAppSpinnerAction } from 'core/types'

export function appLoadSpinner(): TAppSpinnerAction {
  return {
    type: APP_LOAD_SPINNER
  }
}

export function appUnloadSpinner(): TAppSpinnerAction {
  return {
    type: APP_UNLOAD_SPINNER
  }
}
