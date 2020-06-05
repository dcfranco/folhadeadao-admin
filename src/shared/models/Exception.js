// @flow
import type { BaseRecordOf } from 'base/BaseRecord'
import { List, Record, Map } from 'immutable'
import { toEntityList } from 'base/BaseList'
import FieldError from 'models/FieldError'
import type { TException, IException, TExceptionPayload, TExceptionFieldError } from 'core/types'

const defaultValues: TException = {
  code: 0,
  data: {},
  request: new Map<any, any>(),
  errors: toEntityList<TExceptionFieldError>([], FieldError),
  alerts: new List(),
  invalidIds: new List(),
  form: null,
  fields: new Map(),
  critical: false
}

export default class Exception extends ((Record<TException>(defaultValues, 'Exception'): any): Class<IException<TException>>) {
  throw(payload: TExceptionPayload) {
    const parents = this.getParentPathsFromRequest(payload.request)
    const errors = this.toFieldError(payload.data, parents)
    const alerts = this.getAlertErrors(errors)
    const invalidIds = this.getInvalidIds(errors)
    const { fields } = defaultValues

    return this.merge({
      code: payload.code,
      data: payload.data,
      request: payload.request,
      critical: payload.critical,
      errors,
      alerts,
      invalidIds,
      fields
    })
  }

  updateFormFieldErrors(field: string, formName: string) {
    const errors = this.get('errors')
    const form = this.get('form')
    const newErrors = errors.filter((error) => {
      if (formName === form && error.get('path') === 'detail') {
        return false
      }
      return error.get('path') !== field || form !== formName
    })
    return this.set('errors', newErrors)
  }

  getFieldError(fieldName: string, isDetailError: boolean = false): string | null {
    const errors = this.get('errors')
    const request = this.get('request')

    if (!errors || errors.size < 1) {
      return null
    }

    const field = (isDetailError && request && request.get(fieldName)) ? 'detail' : fieldName
    const error = errors.find((err) => err.get('path') === field)
    if (!error) {
      return null
    }

    const reason = error.get('reason')
    if (reason instanceof List) {
      return reason.get(0) || null
    }
    if (Array.isArray(reason)) {
      return reason[0] || null
    }

    if (typeof reason === 'string') {
      return reason
    }

    return null
  }

  getInvalidIds(errors: List<BaseRecordOf<TExceptionFieldError>>): List<string> {
    if (errors.size < 1) {
      return new List<string>()
    }

    return errors.reduce((result, fieldError) => {
      const formId = fieldError.get('form')
      if (formId && !result.includes(formId)) {
        return result.push(formId)
      }
      return result
    }, new List<string>())
  }

  getAlertErrors(errors: List<BaseRecordOf<TExceptionFieldError>>): List<string> {
    if (errors.size < 1) {
      return new List<string>()
    }

    return errors.reduce((result, error) => {
      if (!error.get('isObjectError') && !error.get('isNonFieldError')) {
        return result
      }

      const reason = error.get('reason')
      if (reason instanceof List) {
        const combinedLists = result.toSet().union(reason.toSet()).toList()
        return combinedLists
      }

      if (reason instanceof Map && reason.get('non_field_errors')) {
        return result.push(reason.get('non_field_errors'))
      }

      if (typeof reason === 'string') {
        return result.push(reason)
      }

      return result
    }, new List<string>())
  }

  getParentPathsFromRequest(request: Map<any, any>, parent?: string = ''): List<string> {
    if (!request || !request.keySeq) {
      return new List()
    }

    return request.keySeq().reduce((result, key) => {
      const value = request.getIn([key])
      if (!value) {
        return result
      }

      if (value instanceof List || Array.isArray(value)) {
        return result.push(`${parent}${key}`)
      }
      if (value instanceof Record || value instanceof Map) {
        const childrenPaths = this.getParentPathsFromRequest(Map<any, any>(value), `${parent}${key}.`)
        const combinedArrays = result
          .push(`${parent}${key}`)
          .toSet()
          .union(childrenPaths.toSet())
          .toList()
        return combinedArrays
      }
      return result
    }, new List())
  }

  toFieldError(
    data: Object,
    paths: List<string> = new List<string>(),
    parent: string = ''
  ): List<BaseRecordOf<TExceptionFieldError>> {
    if (!data) {
      return new List()
    }
    return Object.keys(data).reduce((result, key) => {
      const value = data[key]
      if (!value) {
        return result
      }
      const path = `${parent}${key}`
      if (Array.isArray(value)
      && value.length > 0
      && value[0].constructor.name === 'Object') {
        const arrayErrors = value.reduce((arrayResult, obj, index) => {
          const childrenErrors = this.toFieldError(obj, paths, `${parent}${key}[${index}].`)
          if (childrenErrors.size > 0) {
            return arrayResult.toSet().union(childrenErrors.toSet()).toList()
          }
          return arrayResult
        }, new List())

        return result.toSet().union(arrayErrors.toSet()).toList()
      }

      if (value.constructor.name === 'Object') {
        const childrenErrors = this.toFieldError(value, paths, `${path}.`)
        const combinedArrays = result.toSet().union(childrenErrors.toSet()).toList()
        return combinedArrays
      }

      const fields = this.get('fields')
      const formId = fields ? fields.getIn([path, 'id']) : null

      const fieldError = new FieldError({
        path,
        reason: (data[key]: any),
        isNonFieldError: key === 'non_field_errors',
        isObjectError: paths.includes(path),
        form: formId || null
      })

      return result.push((fieldError: any))
    }, new List<BaseRecordOf<TExceptionFieldError>>())
  }
}
