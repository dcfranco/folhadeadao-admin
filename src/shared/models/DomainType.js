import BaseRecord from 'base/BaseRecord'

const defaultValues = {
  id: null,
  value: null,
  name: null,
  createdAt: null
}

export default class DomainType extends BaseRecord(defaultValues, 'DomainType') {
  constructor(values) {
    super({
      ...values
    })
  }
}
