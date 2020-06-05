export const ORDERS = {
  ASC: '',
  DESC: '-'
}

const OrderingBuilder = () => {
  const _fields = []

  const builder = {
    add: (name, order = ORDERS.ASC) => {
      _fields.push({
        name,
        order
      })
      return builder
    },
    build: () => {
      return _fields.map((field, inx) => {
        if (inx === 0) {
          return `${field.order}${field.name}`
        }

        return `,${field.order}${field.name}`
      }).join('')
    }
  }

  return builder
}

export default OrderingBuilder
