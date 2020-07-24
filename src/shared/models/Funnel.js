// @flow
import BaseRecord from 'base/BaseRecord'
import { List } from 'immutable'
import UserClient from './UserClient'
import type { TFunnel } from './types/Funnel'

const defaultValues: TFunnel = {
  id: null,
  createdAt: null,
  currentQuestion: null,
  hasFinished: false,
  token: null,
  funnelId: null,
  userClientId: null,
  sellerId: null,
  userClient: null,
  seller: null,
  funnelAnswers: new List()
}

export default class Funnel extends BaseRecord<TFunnel>(defaultValues, 'Funnel') {
  constructor(values: Object) {
    super({
      ...values,
      userClient: values && values.userClient
        ? new UserClient(values.userClient) : defaultValues.userClient,
      funnelAnswers: values && values.funnelAnswers
        ? List(values.funnelAnswers) : defaultValues.funnelAnswers
    })
  }
}
