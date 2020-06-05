import { useContext } from 'react'
import { CoreContext } from 'core'

function useExporter() {
  const { Exporter } = useContext(CoreContext)

  return Exporter
}

export default useExporter
