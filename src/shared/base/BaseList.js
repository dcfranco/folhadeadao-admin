// @flow
import { Record, List, Map, RecordInstance } from 'immutable'
import type { BaseRecordOf, BaseRecordFactory } from './BaseRecord'

type TBaseListValues<O> = {|
  count: number,
  skip: number,
  next: string | null,
  previous: string | null,
  results: List<BaseRecordOf<O>>,
  selected: List<BaseRecordOf<O>>,
  options: Map<string, any>,
  filters: Map<string, any>
|}

export default function BaseList<O: Object>(
  defaultValues: TBaseListValues<O>
): RecordInstance<TBaseListValues<O>> {
  class CBaseList extends Record<TBaseListValues<O>>(defaultValues, 'CBaseList') {
    constructor(values) {
      super({
        ...values,
        filters: values && values.filters ? values.filters : defaultValues.filters,
        options: values && values.options ? values.options : defaultValues.options
      })
    }

    getTotalPages(): number {
      const options = this.get('options')
      if (options && options.get('limit')) {
        return Math.ceil(this.get('count') / options.get('limit'))
      }
      return 0
    }

    withoutItem(value: any, field: string = 'id'): this {
      const results = this.get('results')
      return this.set('results', results.filter((item) => {
        return item.get(field) !== value
      }))
    }

    isAllSelected(): boolean {
      const results = this.get('results')
      const selected = this.get('selected')
      const skip = this.get('skip')
      const resultsSize = (results.size - skip)
      return resultsSize > 0 && resultsSize === selected.size
    }

    deselectItem(value: O, field: string = 'id'): this {
      const selected = this.get('selected')
      return this.set('selected', selected.filter((item) => {
        return item.get(field) !== value.get(field)
      }))
    }

    selectItem(value: O): this {
      const selected = this.get('selected')
      return this.set('selected', selected.push(value))
    }
  }

  return new CBaseList(defaultValues)
}

export function toEntityList<O: Object = Object>(
  data: Array<O>,
  Profile: BaseRecordFactory<O>
): List<BaseRecordOf<O>> {
  let profileItems = new List<BaseRecordOf<O>>()
  if (data) {
    data.forEach((value) => {
      profileItems = profileItems.push(new Profile(value))
    })
  }
  return profileItems
}
