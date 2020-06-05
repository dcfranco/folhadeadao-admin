// @flow
import type { TRoute } from 'types/profiles'
import type { Location } from 'react-router-dom'

export type TLocation = Location & {
  getStructure(): TRoute,
}
