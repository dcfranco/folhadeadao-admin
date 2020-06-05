import { Map } from 'immutable'
import Customer from 'models/Customer'
import moment from 'moment'

export default class CustomersFactory {
  static createRequest(values) {
    if (!values) {
      return new Map()
    }

    let request = new Map({ ...values.toJS(), createdAt: moment().toISOString() })
    const customer = new Customer(request.toJS())
    if (request.get('phone')) {
      request = request.set('phone', `${customer.getCleanValue('phone')}`)
    }

    return request
  }

  static editRequest(values) {
    if (!values) {
      return new Map().d
    }

    let request = values
    const customer = new Customer(request.toJS())
    if (request.get('phone')) {
      request = request.set('phone', `${customer.getCleanValue('phone')}`)
    }

    return request
  }
}
