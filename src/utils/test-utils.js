import React from 'react'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import configureStore from 'store/configureStore.prod'

export function renderWithRedux(
  ui,
  initialState = {}
) {
  const { store } = configureStore(initialState)
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  }
}
