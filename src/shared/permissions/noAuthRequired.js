// @flow
import type { TPermissionsValidator, TCore } from 'types'
import type { TRUserProfile } from 'models/types/UserProfile'
import { EProfileKeys } from 'constants/profile'

function noAuthRequired(): TPermissionsValidator {
  return {
    validate: () => {
      const { Redux: { store: { getState } } }: TCore = this
      const state = getState()
      return state.user.getIn(['options', 'authenticated'])
    },
    action: () => {
      const { History, Profile, Redux: { store: { getState } } }: TCore = this
      const state = getState()
      const selectedProfile: TRUserProfile = state.user.getIn(['options', 'selectedProfile'])
      if (!selectedProfile || !selectedProfile.get('type')) {
        const { pages } = Profile[EProfileKeys.DEFAULT].profile
        History.push(pages.PROFILES)
      } else {
        const { route } = Profile[selectedProfile.get('type') || EProfileKeys.DEFAULT].profile
        History.push(route)
      }
    }
  }
}

export default noAuthRequired
