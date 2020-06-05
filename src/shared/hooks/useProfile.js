import { useContext } from 'react'
import { CoreContext } from 'core'

function useProfile() {
  const { Profile } = useContext(CoreContext)
  return Profile
}

export default useProfile
