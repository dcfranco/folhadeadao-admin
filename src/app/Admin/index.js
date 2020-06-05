// @flow
import { EProfileKeys } from 'constants/profile'

import ProfileBuilder from 'builders/ProfileBuilder'
import AdminProfile from 'admin/structure'

const AdminProfileInstance = ProfileBuilder(AdminProfile, EProfileKeys.ADMIN)

export default AdminProfileInstance
