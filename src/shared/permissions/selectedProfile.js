// @flow
// import { getRoutesFromPathname } from 'helpers'
import { EProfileKeys } from 'constants/profile'

import type { TPermissionsValidator, TCore } from 'types'

function selectedProfile(): TPermissionsValidator {
  return {
    validate: () => {
      // const { Profile, History, Redux: { store: { getState } } }: TCore = this
      // const { location: { pathname } } = History
      // const profile = getState().user.getIn(['options', 'selectedProfileId'])
      // if (!profile) {
      //   return true
      // }

      // const [currentRoute] = getRoutesFromPathname(pathname)
      // const { route } = Profile[profile.get('entidade_tipo')].profile
      // return currentRoute !== route
      return false
    },
    action: () => {
      const { History, Profile }: TCore = this
      const { pages } = Profile[EProfileKeys.DEFAULT].profile
      History.push(pages.PROFILES)
    }
  }
}

export default selectedProfile
