// @flow
import { EProfileTypes } from 'constants/profile'
import { AUTH_REQUIRED } from 'constants/permission'
import Image from 'components/Image'

import AdminProfileContainer from 'admin/pages'
import AdminRoutes from 'admin/structure/routes'

import { getPagesFromRoutes } from 'helpers'

const { AVAILABLE_IMAGES } = Image

const AdminProfile = {
  name: 'Administrador',
  route: '/admin',
  theme: 'admin',
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
  component: AdminProfileContainer,
  routes: AdminRoutes,
  pages: getPagesFromRoutes(AdminRoutes, '/admin')
}

export type TAdminProfile = typeof AdminProfile

export default AdminProfile
