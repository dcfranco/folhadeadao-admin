import { Map } from 'immutable'
import moment from 'moment'

export default class QuestionsFactory {
  static createRequest(values) {
    if (!values) {
      return new Map()
    }

    let request = new Map({ ...values.toJS(), createdAt: moment().toISOString() })
    request = request.set('categoryId', values.getIn(['categoryId', 'value']))
    request = request.set('typeId', values.getIn(['typeId', 'value']))
    return request
  }

  static editRequest(values) {
    if (!values) {
      return new Map()
    }

    let request = new Map({ ...values.toJS(), createdAt: moment().toISOString() })
    request = request.set('categoryId', values.getIn(['categoryId', 'value']))
    request = request.set('typeId', values.getIn(['typeId', 'value']))
    return request
  }
}
