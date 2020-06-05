// @flow
import BaseRecord from 'base/BaseRecord'
import type { TUserProfile } from './types/UserProfile'

const defaultValues: TUserProfile = {
  id: null,
  name: null,
  type: null,
  permissions: []
}

export default class UserProfile extends BaseRecord<TUserProfile>(defaultValues, 'UserProfile') {
  constructor(values: Object) {
    super({
      ...values
    })
  }
}
