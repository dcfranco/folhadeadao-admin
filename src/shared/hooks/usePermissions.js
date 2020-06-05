import { useContext } from 'react'
import { CoreContext } from 'core'

function usePermissions() {
  const { Permissions } = useContext(CoreContext)

  return Permissions
}

export default usePermissions
