// @flow
import { EProfileTypes } from 'constants/profile'

import DefaultProfileContainer from 'default/pages'
import DefaultRoutes from 'default/structure/routes'

import { getPagesFromRoutes } from 'helpers'

const DefaultProfile = {
  name: 'Central Credit',
  route: '/',
  theme: 'Default',
  type: EProfileTypes.DEFAULT,
  component: DefaultProfileContainer,
  routes: DefaultRoutes,
  pages: getPagesFromRoutes(DefaultRoutes)
}

export type TDefaultProfile = typeof DefaultProfile

export default DefaultProfile
