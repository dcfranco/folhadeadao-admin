import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { CoreContext } from 'core'
import { EProfileKeys } from 'constants/profile'

function useStructure() {
  const { Profile } = useContext(CoreContext)
  const selectedProfile = useSelector(({ user }) => user.getIn(['options', 'selectedProfile']))

  if (!selectedProfile || !selectedProfile.get('type')) {
    return Profile[EProfileKeys.DEFAULT].profile
  }

  return Profile[selectedProfile.get('type')].profile
}

export default useStructure
