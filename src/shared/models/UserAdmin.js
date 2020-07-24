import BaseRecord from 'base/BaseRecord'
import { toEntityList } from 'base/BaseList'
import UserClient from './UserClient'
import User from './User'

const defaultValues = {
  ID: null,
  email: null,
  name: null,
  status: null,
  isSeller: null,
  type: null,
  token: null,
  tokenExp: null,
  dateUp: null,
  autokill: null,
  user: null,
  userClients: toEntityList([], UserClient)
}

export default class UserAdmin extends BaseRecord(defaultValues, 'UserAdmin') {
  constructor(values) {
    super({
      ...values,
      user: values.user ? new User(values.user) : defaultValues.user,
      userClients: values.userClients ? toEntityList(values.userClients, UserClient)
        : defaultValues.userClients
    })
  }
}
