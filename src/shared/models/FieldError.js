// @flow
import { List } from 'immutable'
import BaseRecord from 'base/BaseRecord'
import type { TExceptionFieldError } from 'core/types'

const defaultValues: TExceptionFieldError = {
  path: '',
  reason: new List<string>(),
  isNonFieldError: false,
  isObjectError: false,
  form: null
}

export default class FieldError extends BaseRecord<TExceptionFieldError>(defaultValues, 'FieldError') {
  constructor(values: TExceptionFieldError) {
    super({
      ...values
    })
  }
}
