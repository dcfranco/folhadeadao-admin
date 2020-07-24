import { Map } from 'immutable'
import UserClient from 'models/UserClient'
import moment from 'moment'

export default class UserClientsFactory {
  static createRequest(values) {
    if (!values) {
      return new Map()
    }

    let request = new Map({ ...values.toJS(), createdAt: moment().toISOString() })
    const userClient = new UserClient(request.toJS())
    if (request.get('phone')) {
      request = request.set('phone', `${userClient.getCleanValue('phone')}`)
    }

    return request
  }

  static editRequest(values) {
    if (!values) {
      return new Map().d
    }

    let request = values
    const userClient = new UserClient(request.toJS())
    if (request.get('phone')) {
      request = request.set('phone', `${userClient.getCleanValue('phone')}`)
    }

    return request
  }
}
