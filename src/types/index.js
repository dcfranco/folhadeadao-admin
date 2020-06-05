// @flow
import type { History } from 'react-router-dom'
import type { TServicesLoader, TReduxLoader, TThemesLoader,
  TProfileLoader, TPermissionsLoader, TImporterLoader, TCacheLoader,
  TExporterLoader } from './loaders'

export type TCore = {|
  Services: TServicesLoader,
  History: History,
  Redux: TReduxLoader,
  Themes: TThemesLoader,
  Profile: TProfileLoader,
  Permissions: TPermissionsLoader,
  Importer: TImporterLoader,
  Exporter: TExporterLoader,
  Cache: TCacheLoader,
|}

export type * from './loaders'
export type * from './profiles'
export type * from './State'
