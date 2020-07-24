import BaseRecord from 'base/BaseRecord'
import DomainType from './DomainType'

const defaultValues = {
  id: null,
  domainTypeId: null,
  imageUrl: null,
  questionId: null,
  value: null,
  label: null,
  tagReference: null,
  className: null,
  domainType: null
}

export default class Domain extends BaseRecord(defaultValues, 'Domain') {
  constructor(values) {
    super({
      ...values,
      domainType: values && values.domainType
        ? new DomainType(values.domainType) : defaultValues.domainType
    })
  }
}
