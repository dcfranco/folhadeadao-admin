// @flow
import type { TProfileInstances } from 'types/profiles'

export type TProfileLoader = {
  ...TProfileInstances,
  render(): any,
}
