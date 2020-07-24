// @flow
import BaseRecord from 'base/BaseRecord'
import { toEntityList } from 'base/BaseList'
import UserProfile from 'models/UserProfile'
import { EProfileKeys } from 'constants/profile'

const defaultValues = {
  id: null,
  name: null,
  email: null,
  username: null,
  lastLogin: null,
  isBlocked: false,
  isAdmin: false,
  isSeller: false,
  profiles: toEntityList([], UserProfile)
}

export default class User extends BaseRecord(defaultValues, 'User') {
  constructor(values, isSeller) {
    const profilesArr = []

    if (values && values.isAdmin) {
      profilesArr.push({ id: 1, name: 'Administrador', type: EProfileKeys.ADMIN, permissions: [] })
    }
    if (isSeller) {
      profilesArr.push({ id: 2, name: 'Representante', type: EProfileKeys.SELLER, permissions: [] })
    }

    super({
      ...values,
      isSeller,
      profiles: toEntityList(profilesArr, UserProfile)
    })
  }
}
