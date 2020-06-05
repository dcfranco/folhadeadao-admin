import { createLogger } from 'redux-logger'
import { Iterable } from 'immutable'

const reduxLogger = createLogger({
  stateTransformer: state => {
    const newState = {}

    Object.keys(state).forEach(key => {
      const stateItem = state[key]

      if (Iterable.isIterable(stateItem)) {
        newState[key] = stateItem.toJS()
      } else {
        newState[key] = stateItem
      }
    })

    return newState
  }
})

export default reduxLogger
