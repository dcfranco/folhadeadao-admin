// @flow
import type { EXCEPTION_SAVE, EXCEPTION_CLEAR } from 'types/actionsType'
import type { TExceptionPayload } from 'core/types/models'

export type TExceptionHandleAction = {|
  type: EXCEPTION_SAVE,
  payload: $Exact<TExceptionPayload>,
|}

export type TExceptionClearAction = {|
  type: EXCEPTION_CLEAR,
|}
