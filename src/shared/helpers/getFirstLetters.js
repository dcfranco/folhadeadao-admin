// @flow
export default (name: ?string, lastname: ?string): string => {
  if (name == null) {
    return 'NC'
  }

  if (name != null && lastname != null) {
    return name.charAt(0).toUpperCase() + lastname.charAt(0).toUpperCase()
  }

  return name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase()
}
