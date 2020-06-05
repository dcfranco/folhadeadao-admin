import { useContext } from 'react'
import { CoreContext } from 'core'

function useImporter() {
  const { Importer } = useContext(CoreContext)

  return Importer
}

export default useImporter
