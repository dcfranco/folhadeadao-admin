export default (normalizers) => {
  return (value, previousValue, allValues, previousAllValues) => {
    let i = 0
    const normalizersLength = normalizers.length
    let currentValue = value
    while (i < normalizersLength) {
      const currentNormalizer = normalizers[i]
      if (typeof currentNormalizer === 'function') {
        currentValue = currentNormalizer(currentValue, previousValue, allValues, previousAllValues)
      }
      i++
    }

    return currentValue
  }
}
