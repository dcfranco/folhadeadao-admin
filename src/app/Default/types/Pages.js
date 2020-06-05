// @flow
import type { TDefaultProfile } from 'default/structure'
import type { TDefaultRoutes } from 'default/structure/routes'

export type TDefaultPageProps = {
  profile: TDefaultProfile,
  parent: {
    route: $PropertyType<TDefaultProfile, 'route'>,
    component?: $PropertyType<TDefaultProfile, 'component'>,
    name: $PropertyType<TDefaultProfile, 'name'>,
    routes: $PropertyType<TDefaultProfile, 'routes'>,
    permissions: $PropertyType<TDefaultProfile, 'permissions'>,
  },
  route: $ElementType<TDefaultRoutes, $Keys<TDefaultRoutes>>,
}

export type TRegistrationModel = $ElementType<TDefaultRoutes, 'REGISTRATION'>

export type TRegistrationPageProps = {
  profile: TDefaultProfile,
  parent: $PropertyType<TDefaultRoutes, 'REGISTRATION'>,
  route: $ElementType<TDefaultRoutes, $Keys<TDefaultRoutes>>,
}

export type TResetPasswordProps = {
  profile: TDefaultProfile,
  parent: $PropertyType<TDefaultRoutes, 'RESET_PASSWORD'>,
  route: $ElementType<TDefaultRoutes, $Keys<TDefaultRoutes>>,
}
