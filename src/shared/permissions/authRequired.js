// @flow
import type { TPermissionsValidator, TCore } from 'types'
import { EProfileKeys } from 'constants/profile'

function authRequired(): TPermissionsValidator {
  return {
    validate: () => {
      const { Redux: { store: { getState } } }: TCore = this
      const state = getState()
      return !state.user.getIn(['options', 'authenticated'])
    },
    action: () => {
      const { History, Profile }: TCore = this
      const { pages } = Profile[EProfileKeys.DEFAULT].profile
      History.push(pages.LOGIN)
    }
  }
}

export default authRequired
