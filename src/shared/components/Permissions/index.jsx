import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { usePermissions } from 'hooks'

const Permissions = ({ children, permissions: validations }) => {
  const permissions = usePermissions()
  useEffect(() => {
    if (permissions) {
      permissions.validate(validations)
    }
  }, [permissions])

  return (
    <Fragment>
      { children }
    </Fragment>
  )
}

Permissions.propTypes = {
  children: PropTypes.node.isRequired,
  permissions: PropTypes.array
}

Permissions.defaultProps = {
  permissions: []
}

export default React.memo(Permissions)
