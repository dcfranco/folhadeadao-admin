import BaseRecord from 'base/BaseRecord'

const defaultValues = {
  id: null,
  layout: null,
  name: null,
  createdAt: null
}

export default class QuestionType extends BaseRecord(defaultValues, 'QuestionType') {
  constructor(values) {
    super({
      ...values
    })
  }
}
