// @flow
import BaseRecord from 'base/BaseRecord'
import { toEntityList } from 'base/BaseList'
import Seller from 'models/Seller'
import UserProfile from 'models/UserProfile'
import { EProfileKeys } from 'constants/profile'
import type { TUserProfile } from './types/UserProfile'
import type { TUser } from './types/User'

const defaultValues: TUser = {
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  genre: null,
  cpf: null,
  username: null,
  lastLogin: null,
  birthday: null,
  isBlocked: false,
  isAdmin: false,
  isSeller: false,
  seller: null,
  profiles: toEntityList([], UserProfile)
}

export default class User extends BaseRecord<TUser>(defaultValues, 'User') {
  constructor(values: Object) {
    const profilesArr: TUserProfile[] = []
    const isSeller = !!(values && values.seller)

    if (values && values.isAdmin) {
      profilesArr.push({ id: 1, name: 'Administrador', type: EProfileKeys.ADMIN, permissions: [] })
    }
    if (isSeller) {
      profilesArr.push({ id: 2, name: 'Representante', type: EProfileKeys.SELLER, permissions: [] })
    }

    super({
      ...values,
      isSeller,
      seller: isSeller ? new Seller(values.seller) : defaultValues.seller,
      profiles: toEntityList(profilesArr, UserProfile)
    })
  }
}
