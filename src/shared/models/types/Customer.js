// @flow
import type { BaseRecordOf } from 'base/BaseRecord'
import type { TSeller } from './Seller'

export type TCustomer = {
  +id: ?number,
  +firstName: ?string,
  +lastName: ?string,
  +email: ?string,
  +genre: ?string,
  +phone: ?string,
  +createdBy: ?$Exact<BaseRecordOf<TSeller>>
}
