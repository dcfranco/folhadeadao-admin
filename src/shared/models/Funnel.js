// @flow
import BaseRecord from 'base/BaseRecord'
import { List } from 'immutable'
import Customer from './Customer'
import Seller from './Seller'
import type { TFunnel } from './types/Funnel'

const defaultValues: TFunnel = {
  id: null,
  createdAt: null,
  currentQuestion: null,
  hasFinished: false,
  token: null,
  funnelId: null,
  customerId: null,
  sellerId: null,
  customer: null,
  seller: null,
  funnelAnswers: new List()
}

export default class Funnel extends BaseRecord<TFunnel>(defaultValues, 'Funnel') {
  constructor(values: Object) {
    super({
      ...values,
      customer: values && values.customer ? new Customer(values.customer) : defaultValues.customer,
      seller: values && values.seller ? new Seller(values.seller) : defaultValues.seller,
      funnelAnswers: values && values.funnelAnswers
        ? List(values.funnelAnswers) : defaultValues.funnelAnswers
    })
  }
}
