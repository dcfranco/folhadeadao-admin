// @flow
import type { BaseRecordOf } from 'base/BaseRecord'
import type { List } from 'immutable'
import type { TSeller } from './Seller'
import type { TRUserProfile } from './UserProfile'

export type TUser = {
  +id: ?number,
  +firstName: ?String,
  +lastName: ?String,
  +email: ?String,
  +username: ?String,
  +cpf: ?String,
  +genre: ?String,
  +lastLogin: ?Date,
  +birthday: ?Date,
  +isBlocked: ?boolean,
  +isAdmin: ?boolean,
  +isSeller: ?boolean,
  +seller: ?$Exact<BaseRecordOf<TSeller>>,
  +profiles: ?List<TRUserProfile>,
}
