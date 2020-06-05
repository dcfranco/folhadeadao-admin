// @flow
import React, { Fragment } from 'react'
import { useLocation, Redirect } from 'react-router-dom'

import type { TProfileComponent } from 'types'
import type { TDefaultProfile } from 'default/structure'

type TDefaultContainerProps = {
  children: any,
  profile: TDefaultProfile,
}
const DefaultContainer: TProfileComponent<TDefaultProfile> = ({
  profile,
  children
}: TDefaultContainerProps) => {
  const location = useLocation()
  const { route, routes } = profile

  if (location.pathname === route) {
    return <Redirect to={routes.LOGIN.route} />
  }
  return <Fragment>{children}</Fragment>
}

export default React.memo<TDefaultContainerProps>(DefaultContainer)
