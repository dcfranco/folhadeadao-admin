export default (services) => ({ dispatch, getState }) => {
  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, services)
    }

    return next(action)
  }
}
