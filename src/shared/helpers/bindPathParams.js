// @flow
function bindPathParams<R: Object>(
  pathParams: ?R,
  path: string
): string {
  if (!pathParams) {
    return path
  }
  return Object.keys(pathParams).reduce((result, key) => {
    return result.replace(`:${key}`, pathParams[key])
  }, path)
}

export default bindPathParams
