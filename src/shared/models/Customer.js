// @flow
import BaseRecord from 'base/BaseRecord'
import Seller from 'models/Seller'
import type { TCustomer } from './types/Customer'

const defaultValues: TCustomer = {
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  genre: null,
  phone: null,
  createdBy: null
}

export default class Customer extends BaseRecord<TCustomer>(defaultValues, 'Customer') {
  constructor(values: Object) {
    super({
      ...values,
      createdBy: values && values.createdBy ? new Seller(values.createdBy) : defaultValues.createdBy
    })
  }
}
