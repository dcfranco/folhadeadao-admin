export default (object) => {
  return Object.keys(object).reduce((result, key) => {
    const currentValue = object[key]
    const newResult = result

    if (currentValue) {
      newResult[key] = currentValue
    }
    return result
  }, {})
}
