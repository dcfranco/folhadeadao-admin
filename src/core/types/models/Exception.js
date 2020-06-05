// @flow
// eslint-disable-next-line no-unused-vars
import { RecordInstance, type List, type Map } from 'immutable'
import type { BaseRecordOf } from 'base/BaseRecord'

export type TExceptionPayload = {|
  code: number,
  data: Object,
  request: Map<any, any>,
  critical?: boolean,
  sentry?: Object,
|}

export type TExceptionFieldError = $ReadOnly<{|
  path: string,
  reason: List<string> | Map<string, any> | string,
  isNonFieldError: boolean,
  isObjectError: boolean,
  form: string | null,
|}>

export type TException = $ReadOnly<{|
  code?: number,
  data?: Object,
  request?: Map<any, any>,
  errors: List<BaseRecordOf<TExceptionFieldError>>,
  alerts?: List<string>,
  invalidIds?: List<string>,
  form?: string | null,
  fields?: Map<string, any>,
  critical?: boolean,
|}>

declare export class IException<O: TException = TException> extends RecordInstance<O> {
  throw(payload: TExceptionPayload): this & $ReadOnly<O>;
  updateFormFieldErrors(field: string, formName: string): this & $ReadOnly<O>;
  getFieldError(fieldName: string, isDetailError?: boolean): string | null;
  getInvalidIds(errors: List<BaseRecordOf<TExceptionFieldError>>): List<string>;
  getAlertErrors(errors: List<BaseRecordOf<TExceptionFieldError>>): List<string>;
  getParentPathsFromRequest(request: Map<any, any>, parent?: string): List<string>;
  toFieldError(data: Object, paths: List<string>, parent: string):
    List<BaseRecordOf<TExceptionFieldError>>;
}
