// @flow
import type { BaseRecordOf } from 'base/BaseRecord'
import type { TUser } from 'models/types/User'
import type { TFunnel } from 'models/types/Funnel'
import type { List } from 'immutable'

export type TSeller = {|
  +id: ?number,
  +createdAt: ?Date,
  +userId: ?number,
  +user: ?$Exact<BaseRecordOf<TUser>>,
  funnelTokens: ?List<BaseRecordOf<TFunnel>>,
|}
