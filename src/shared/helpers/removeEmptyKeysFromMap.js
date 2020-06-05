import { Map } from 'immutable'

const isArray = (value) => typeof value === 'object' && value.constructor.name === 'List'
const isObject = (value) => typeof value === 'object' && value.constructor.name === 'Map'

const isEmptyArray = (value) => isArray(value) && value.size === 0
const isEmptyObject = (value) => isObject(value) && value.size === 0

const removeEmptyKeysFromMap = (map) => {
  if (map) {
    let newMap = new Map(map)
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of map.entries()) {
      if (value === 0 || value === null || value === undefined || value === '' || isEmptyArray(value) || isEmptyObject(value)) {
        newMap = newMap.delete(key)
      } else if (isObject(value)) {
        newMap = newMap.set(key, removeEmptyKeysFromMap(value))
      }
    }
    return newMap
  }
  return map
}

export default (map) => {
  return removeEmptyKeysFromMap(map)
}
