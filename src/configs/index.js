// @flow
// Is DEV or Production
export const IsEnvProduction: boolean = process.env.NODE_ENV === 'production'

// Base URL for Helmet
export const BaseUrl: string = 'https://funildevendas.herokuapp.com'

// Endpoint Backend
export const ApiUrl: string | void = 'https://folhadeadao-backend.herokuapp.com' // process.env.REACT_APP_CREDITOR_BASE_URL

// Time left to resfresh token, 15 minutes
export const RefreshThreshold: number = 15

// Manifest to get those themes from webpack
export const ThemesManifestName: string = 'themes-manifest.json'

// Configuration to persist redux reducers in storage
export const PersistConfig = {
  key: 'adao-leaf',
  whitelist: ['user']
}

// Minutes to keep cache
export const CacheMinutes = 15

export const ReduxBaseActions: string = '@@adao-leaf'
