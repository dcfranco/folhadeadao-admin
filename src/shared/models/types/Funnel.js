// @flow
import type { List } from 'immutable'
import type { BaseRecordOf } from 'base/BaseRecord'
import type { TUserClient } from './UserClient'
import type { TSeller } from './Seller'

export type TFunnel = {
  +id: ?number,
  +createdAt: ?Date,
  +currentQuestion: ?string,
  +hasFinished: ?boolean,
  +token: ?string,
  +funnelId: ?any,
  +userClientId: ?any,
  +sellerId: ?any,
  +userClient: ?BaseRecordOf<TUserClient>,
  +seller: ?BaseRecordOf<TSeller>,
  +funnelAnswers: ?List<Object>
}
