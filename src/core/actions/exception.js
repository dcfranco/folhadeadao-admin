// @flow
import { EXCEPTION_SAVE, EXCEPTION_CLEAR } from 'core/constants/actionsType'

import type { TExceptionHandleAction, TExceptionClearAction } from 'core/types'

export function create(
  code: number,
  data: Object,
  request: any,
  critical?: boolean,
  sentry?: Object
): TExceptionHandleAction {
  return {
    type: EXCEPTION_SAVE,
    payload: {
      code,
      data,
      request,
      critical,
      sentry
    }
  }
}

export function clear(): TExceptionClearAction {
  return {
    type: EXCEPTION_CLEAR
  }
}
