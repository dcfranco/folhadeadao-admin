import BaseRecord from 'base/BaseRecord'
import { toEntityList } from 'base/BaseList'
import Product from './Product'

const defaultValues = {
  ID: null,
  ordem: null,
  categoria: null,
  status: null,
  pai: null,
  products: toEntityList([], Product)
}

export default class Category extends BaseRecord(defaultValues, 'Category') {
  constructor(values) {
    super({
      ...values,
      products: values && values.questions
        ? toEntityList(values.questions, Product) : defaultValues.questions
    })
  }
}
