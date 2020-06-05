// @flow
import React from 'react'
import { EProfileKeys } from 'constants/profile'
import SwitchTransition from 'components/SwitchTransition'

import type { TLoader, TProfileLoader } from 'types'

function Profile(): TLoader<TProfileLoader> {
  return {
    load: async () => {
      const { default: DefaultInstance } = await import('default')
      const { default: SellerInstance } = await import('seller')
      const { default: AdminInstance } = await import('admin')

      return {
        [EProfileKeys.DEFAULT]: DefaultInstance,
        [EProfileKeys.SELLER]: SellerInstance,
        [EProfileKeys.ADMIN]: AdminInstance,
        render() {
          return (
            <SwitchTransition>
              { SellerInstance.element }
              { AdminInstance.element }
              { DefaultInstance.element }
            </SwitchTransition>
          )
        }
      }
    }
  }
}

export default Profile
