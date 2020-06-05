import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import ThemeRender from 'components/ThemeRender'
import AppLoader from 'components/AppLoader'
import ToastProvider from 'components/ToastProvider'
import Core from './core'

import 'moment/locale/pt-br'

const App = lazy(() => import('./app'))

ReactDOM.render(
  <Core>
    { ({ Redux, History, Profile }) => {
      return (
        <Provider store={Redux.store}>
          <PersistGate loading={null} persistor={Redux.persistor}>
            <Suspense fallback={<AppLoader />}>
              <ToastProvider>
                <ThemeRender />
                <App history={History} profile={Profile} />
              </ToastProvider>
            </Suspense>
          </PersistGate>
        </Provider>
      )
    } }
  </Core>,
  document.getElementById('root')
)
