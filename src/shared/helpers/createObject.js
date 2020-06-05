const createObject = (obj, path, value = null) => {
  let fullpath = typeof path === 'string' ? path.split('.') : path
  let current = obj
  while (fullpath.length > 1) {
    const [head, ...tail] = fullpath
    fullpath = tail
    if (current[head] === undefined) {
      current[head] = {}
    }
    current = current[head]
  }
  current[fullpath[0]] = value
  return obj
}

export default createObject
