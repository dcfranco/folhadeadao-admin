import { Record, Map } from 'immutable'
import BaseRecord from './BaseRecord'

const defaultValues = {
  errorMessage: '',
  options: new Map(),
  data: BaseRecord()
}

export default class Base extends Record(defaultValues, Base) {
  constructor(values) {
    super({
      ...values
    })
  }
}
