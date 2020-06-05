// @flow
import type { Permission } from 'constants/permission'

export type TPermissionsValidator = {
  validate(): boolean,
  action(): void,
}

export type TPermissionsLoader = {
  validate: (validations: Array<Permission>) => void,
}
