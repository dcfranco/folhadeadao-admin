import { useContext } from 'react'
import { CoreContext } from 'core'

function useCache() {
  const { Cache } = useContext(CoreContext)

  return Cache
}

export default useCache
