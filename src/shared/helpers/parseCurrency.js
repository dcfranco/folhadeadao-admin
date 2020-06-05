export default (value = 0) => {
  if (typeof value === 'number') {
    return value.toLocaleString('pt-BR', {
      currency: 'BRL',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      style: 'currency'
    })
  // eslint-disable-next-line no-restricted-globals
  } if (typeof value === 'string' && !isNaN(parseFloat(value))) {
    return parseFloat(value).toLocaleString('pt-BR', {
      currency: 'BRL',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      style: 'currency'
    })
  }

  return 'R$ 0,00'
}
