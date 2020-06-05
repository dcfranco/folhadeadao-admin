export default (location, route, key) => {
  if (key === 'INDEX') {
    return location && location.pathname === route
  }
  return location.pathname.indexOf(route) > -1 || false
}
