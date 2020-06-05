// @flow
import type { BaseRecordOf } from 'base/BaseRecord'
import type { TUser } from 'models/types/User'

export type TSeller = {|
  +id: ?number,
  +createdAt: ?Date,
  +userId: ?number,
  +user: ?$Exact<BaseRecordOf<TUser>>,
|}
