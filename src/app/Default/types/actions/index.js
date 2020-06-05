/* eslint-disable no-use-before-define */
// @flow
import type { TState } from 'types'
import type { TRegisterSuccessAction } from './Registration'

export type TDefaultActions = TRegisterSuccessAction

export type TDispatch = (action: TDefaultActions | TThunkAction | TPromiseAction) => any;
export type TGetState = () => TState;
export type TThunkAction = (dispatch: TDispatch, getState: TGetState, services: any) => any;
export type TPromiseAction = Promise<TDefaultActions | null>;

export type * from './Registration'
