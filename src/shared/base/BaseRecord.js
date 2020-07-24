// @flow
// eslint-disable-next-line no-unused-vars
import { Record, RecordInstance } from 'immutable'
import { genre } from 'constants/general'
import moment from 'moment'
import type Moment from 'moment'

declare class IBaseRecord<O: Object = Object> extends RecordInstance<O> {
  getFormatedDate(field: $Keys<O>, format: string): string | '-';
  getFormatedCurrency(field: $Keys<O> | number): string;
  getFormatedPercent(field: $Keys<O> | number, abs?: boolean): string;
  getFormatedPhone(field: $Keys<O>): ?string;
  getFullName(): ?string;
  getCleanValue(field: $Keys<O>): string;
  getGenre(): ?string;
  getAsMoment(field: $Keys<O>): ?Moment;
  getBooleanAsYesOrNo(field: $Keys<O>): string;
  getAsSelectObject(field: $Keys<O>, value: $Keys<O>, label: $Keys<O>): Object;
}

export type BaseRecordFactory<Values: Object> = Class<IBaseRecord<Values>>;
export type BaseRecordOf<Values: Object> = IBaseRecord<Values> & $ReadOnly<Values>;

function BaseRecord<O: Object = Object>(spec: O, name?: string): Class<IBaseRecord<O>> {
  const ObjBaseRecord: Class<IBaseRecord<O>> = ((Record<O>(spec, name): any): Class<IBaseRecord<O>>)
  return class extends ObjBaseRecord {
    getGenre(): ?string {
      if (this.get('genre')) {
        const fullGenre = genre.find((g) => g.value === this.get('genre'))
        return fullGenre.label || ''
      }

      return ''
    }

    getBooleanAsYesOrNo(field: $Keys<O>): string {
      return this.get(field) ? 'Sim' : 'Não'
    }

    getAsSelectObject(field: $Keys<O>, value: $Keys<O>, label: $Keys<O>): Object {
      return {
        value: this.getIn([field, value]),
        label: this.getIn([field, label])
      }
    }

    getFullName(): ?string {
      return `${this.get('name')}`
    }

    getFormatedDate(field: $Keys<O>, format: string = 'DD/MM/YYYY'): string | '-' {
      if (this.get(field)) {
        return moment(this.get(field)).format(format)
      }
      return '-'
    }

    getFormatedCurrency(field: $Keys<O> | number): string {
      const monetaryValue: number = typeof field === 'string'
        ? Number.parseFloat(this.get<$Keys<O>>(field))
        : field
      return monetaryValue.toLocaleString('pt-BR', {
        currency: 'BRL',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
        style: 'currency'
      })
    }

    getFormatedPercent(field: $Keys<O> | number, abs: boolean = true): string {
      const fractionaryValue: number = typeof field === 'string'
        ? Number.parseFloat(this.get<$Keys<O>>(field))
        : field
      return `${(abs ? fractionaryValue : (fractionaryValue / 100)).toFixed(0)}%`
    }

    getFormatedPhone(field: $Keys<O>): ?string {
      let number = this.get(field)

      if (/^\+55/.test(number)) {
        number = number.slice(3)
      }

      if (!number) {
        return null
      }

      return number.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '($1) $2 $3 $4')
    }

    getCleanValue(field: $Keys<O>): string {
      const value = this.get(field)
      if (typeof value === 'string') {
        return value.replace(/([( ]|[) ])+/g, '')
      }
      return value
    }

    getAsMoment(field: $Keys<O>): ?Moment {
      if (this.get(field)) {
        return moment(this.get(field), 'YYYY-MM-DD')
      }
      return null
    }
  }
}

export default BaseRecord
