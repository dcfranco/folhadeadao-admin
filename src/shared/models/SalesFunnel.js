import BaseRecord from 'base/BaseRecord'
import { toEntityList } from 'base/BaseList'
import Question from './Question'

const defaultValues = {
  id: null,
  name: null,
  steps: null,
  description: null,
  createdAt: null,
  isActive: null,
  questions: toEntityList([], Question)
}

export default class SalesFunnel extends BaseRecord(defaultValues, 'SalesFunnel') {
  constructor(values) {
    super({
      ...values,
      questions: values && values.questions
        ? toEntityList(values.questions, Question) : defaultValues.questions
    })
  }
}
