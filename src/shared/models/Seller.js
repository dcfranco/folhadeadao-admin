// @flow
import BaseRecord from 'base/BaseRecord'
import { List, fromJS } from 'immutable'
import type { TSeller } from './types/Seller'
import User from './User'

const defaultValues: TSeller = {
  id: null,
  createdAt: null,
  userId: null,
  user: null,
  funnelTokens: new List()
}

export default class Seller extends BaseRecord<TSeller>(defaultValues, 'Seller') {
  constructor(values: Object) {
    super({
      ...values,
      user: values && values.user ? new User(values.user) : defaultValues.user,
      funnelTokens: values && values.funnelTokens ? fromJS(values.funnelTokens)
        : defaultValues.funnelTokens
    })
  }
}
