import { AUTH_REQUIRED, NOAUTH_REQUIRED, AUTO_SELECT_PROFILE, SELECTED_PROFILE } from 'constants/permission'

import authRequired from './authRequired'
import noauthRequired from './noAuthRequired'
import autoSelectProfile from './autoSelectProfile'
import selectedProfile from './selectedProfile'

export default {
  [AUTH_REQUIRED]: authRequired,
  [NOAUTH_REQUIRED]: noauthRequired,
  [AUTO_SELECT_PROFILE]: autoSelectProfile,
  [SELECTED_PROFILE]: selectedProfile
}
