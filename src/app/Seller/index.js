// @flow
import { EProfileKeys } from 'constants/profile'

import ProfileBuilder from 'builders/ProfileBuilder'
import SellerProfile from 'seller/structure'

const SellerProfileInstance = ProfileBuilder(SellerProfile, EProfileKeys.SELLER)

export default SellerProfileInstance
