// @flow
export default (pathname: string): string[] => {
  const routes = pathname.split('/').slice(1)
  return routes.map<string>((route) => `/${route}`)
}
