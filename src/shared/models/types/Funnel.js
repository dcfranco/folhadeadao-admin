// @flow
import type { List } from 'immutable'
import type { BaseRecordOf } from 'base/BaseRecord'
import type { TCustomer } from './Customer'
import type { TSeller } from './Seller'

export type TFunnel = {
  +id: ?number,
  +createdAt: ?Date,
  +currentQuestion: ?string,
  +hasFinished: ?boolean,
  +token: ?string,
  +funnelId: ?any,
  +customerId: ?any,
  +sellerId: ?any,
  +customer: ?BaseRecordOf<TCustomer>,
  +seller: ?BaseRecordOf<TSeller>,
  +funnelAnswers: ?List<Object>
}
