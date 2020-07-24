import BaseRecord from 'base/BaseRecord'

const defaultValues = {
  ID: null,
  ordem: null,
  titulo: null,
  descricao: null,
  valorAnterior: null,
  valor: null,
  estoque: null,
  status: null,
  tamanho: null
}

export default class Product extends BaseRecord(defaultValues, 'Product') {
  constructor(values) {
    super({
      ...values
    })
  }
}
