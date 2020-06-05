// @flow
import type { TProfileKeys } from 'constants/profile'
import type { BaseRecordOf } from 'base/BaseRecord'

export type TUserProfile = {
  +id: ?number,
  +name: ?string,
  +type: ?TProfileKeys,
  +permissions: ?string[],
}

export type TRUserProfile = BaseRecordOf<TUserProfile>
