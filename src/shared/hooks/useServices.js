import { useContext } from 'react'
import { CoreContext } from 'core'

function useServices() {
  const { Services } = useContext(CoreContext)

  return Services
}

export default useServices
