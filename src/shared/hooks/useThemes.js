import { useContext } from 'react'
import { CoreContext } from 'core'

function useThemes() {
  const { Themes } = useContext(CoreContext)

  return Themes
}

export default useThemes
