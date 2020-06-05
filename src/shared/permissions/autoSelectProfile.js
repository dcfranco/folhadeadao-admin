// @flow
import { userSelectProfile } from 'core/actions/user'

import type { TPermissionsValidator, TCore } from 'types'

function autoSelectProfile(): TPermissionsValidator {
  return {
    validate: () => {
      const { Redux: { store: { getState } } }: TCore = this
      const user = getState().user.get('data')
      const profiles = user.get('profiles')
      return profiles.size === 1
    },
    action: () => {
      const { History, Profile, Redux }: TCore = this
      const { store: { getState, dispatch } } = Redux
      const profiles = getState().user.getIn(['data', 'profiles'])
      const profile = profiles.get(0)
      dispatch(userSelectProfile(profile))

      const { route } = Profile[profile.get('type')].profile
      setTimeout(() => History.push(route))
    }
  }
}

export default autoSelectProfile
