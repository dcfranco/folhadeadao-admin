import { Map } from 'immutable'
import moment from 'moment'

export default class UsersFactory {
  static createRequest(values) {
    if (!values) {
      return new Map()
    }

    let request = values
    request = request.set('birthday', moment(values.get('birthday'), 'DD/MM/YYYY').toISOString())
    request = request.delete('isSeller')
    return request
  }

  static editRequest(values) {
    if (!values) {
      return new Map().d
    }

    let request = values
    request = request.set('birthday', moment(values.get('birthday'), 'DD/MM/YYYY').toISOString())
    request = request.delete('isSeller')
    return request
  }
}
