// @flow
import type { TRegister } from 'default/constants/actionsType'

export type TRegisterSuccessActionPayload = {|
  cpf: string,
  email: string,
  passowrd: string,
|}
export type TRegisterSuccessAction = {|
  type: $Values<TRegister>,
  payload: TRegisterSuccessActionPayload
|}
