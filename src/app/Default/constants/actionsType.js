// @flow
import { ReduxBaseActions } from 'configs'

export const defaultPrefix = `${ReduxBaseActions}/DEFAULT`

// Register Page
export const Register = {
  REGISTER_SUCCESS: `${defaultPrefix}/REGISTER_SUCCESS`
}

export type TRegister = typeof Register
