// @flow
import { EProfileTypes } from 'constants/profile'
import { AUTH_REQUIRED } from 'constants/permission'
import Image from 'components/Image'

import SellerProfileContainer from 'seller/pages'
import SellerRoutes from 'seller/structure/routes'

import { getPagesFromRoutes } from 'helpers'

const { AVAILABLE_IMAGES } = Image

const SellerProfile = {
  name: 'Representante',
  route: '/seller',
  theme: 'seller',
  type: EProfileTypes.MODULE,
  logo: {
    image: AVAILABLE_IMAGES.LOGO_FULL,
    className: 'bg-logo'
  },
  small: {
    image: AVAILABLE_IMAGES.LOGO_FULL,
    className: 'bg-logo'
  },
  permissions: [AUTH_REQUIRED],
  component: SellerProfileContainer,
  routes: SellerRoutes,
  pages: getPagesFromRoutes(SellerRoutes, '/seller')
}

export type TSellerProfile = typeof SellerProfile

export default SellerProfile
