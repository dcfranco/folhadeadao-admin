// @flow
import type { Store } from 'redux'

export type TReduxLoader = {
  store: Store<any, any>,
  persistor: Object,
}
