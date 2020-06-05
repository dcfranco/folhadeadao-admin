// @flow
import { EProfileKeys } from 'constants/profile'

import ProfileBuilder from 'builders/ProfileBuilder'
import DefaultProfile from 'default/structure'

const DefaultProfileInstance = ProfileBuilder(DefaultProfile, EProfileKeys.DEFAULT)

export default DefaultProfileInstance
