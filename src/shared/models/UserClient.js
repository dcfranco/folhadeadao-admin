import BaseRecord from 'base/BaseRecord'

const defaultValues = {
  ID: null,
  image: null,
  name: null,
  email: null,
  phone: null,
  cpf: null,
  birthday: null,
  itemsSize: null,
  createdAt: null,
  sellerId: null
}

export default class UserClient extends BaseRecord(defaultValues, 'UserClient') {
  constructor(values) {
    super({
      ...values
    })
  }
}
