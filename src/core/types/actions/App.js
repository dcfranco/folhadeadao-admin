// @flow
import type { APP_LOAD_SPINNER, APP_UNLOAD_SPINNER } from 'types/actionsType'

export type TAppSpinnerAction = {|
  type: APP_LOAD_SPINNER | APP_UNLOAD_SPINNER,
|}
