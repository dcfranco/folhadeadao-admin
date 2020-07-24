import BaseRecord from 'base/BaseRecord'
import { toEntityList } from 'base/BaseList'
import Category from './Category'
import Domain from './Domain'
import QuestionType from './QuestionType'

const defaultValues = {
  id: null,
  order: null,
  description: null,
  title: null,
  isRequired: true,
  typeId: null,
  maxSelectable: null,
  isActive: null,
  createdAt: null,
  categoryId: null,
  funnelId: null,
  category: null,
  type: null,
  domains: toEntityList([], Domain)
}

export default class Question extends BaseRecord(defaultValues, 'Question') {
  constructor(values) {
    super({
      ...values,
      domains: values && values.domains
        ? toEntityList(values.domains, Domain) : defaultValues.domains,
      type: values && values.type
        ? new QuestionType(values.type) : defaultValues.type,
      category: values && values.category
        ? new Category(values.category) : defaultValues.category
    })
  }
}
