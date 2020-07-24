import { Map } from 'immutable'

export default class DomainsFactory {
  static createRequest(values) {
    if (!values) {
      return new Map()
    }

    let request = new Map({ ...values.toJS() })
    request = request.set('domainTypeId', values.getIn(['domainTypeId', 'value']))
    request = request.set('questionId', parseInt(values.get('questionId'), 10))
    return request
  }

  static editRequest(values) {
    if (!values) {
      return new Map()
    }

    let request = new Map({ ...values.toJS() })
    request = request.set('domainTypeId', values.getIn(['domainTypeId', 'value']))
    request = request.set('questionId', parseInt(values.get('questionId'), 10))
    return request
  }
}
