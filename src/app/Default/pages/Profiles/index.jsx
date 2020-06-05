import React from 'react'
import PropTypes from 'prop-types'
import { ExitToApp } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from 'components/Avatar'
import Button from 'components/Button'
import CleanTemplate from 'templates/CleanTemplate'
import { userLogout, userSelectProfile } from 'core/actions/user'
import { useCache, useProfile } from 'hooks'

const { Layout, List, ListContainer, ListItem, ListHeader } = CleanTemplate

const Profiles = ({ profile: { pages } }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const modules = useProfile()
  const user = useSelector(state => state.user.get('data'))
  const cache = useCache()

  const onSelectProfile = (profile, profileStructure) => async () => {
    cache.clear()
    await dispatch(userSelectProfile(profile))
    setTimeout(() => history.push(profileStructure.route))
  }

  const onLogout = async () => {
    await dispatch(userLogout())
    setTimeout(() => history.push(pages.LOGIN))
  }

  const profiles = user.get('profiles')

  if (!profiles || profiles.size === 1) {
    return null
  }
  return (
    <Layout className='profiles'>
      <ListContainer>
        <List>
          <ListHeader>Escolha um perfil de acesso:</ListHeader>
          {profiles.size > 0 ? (
            profiles
              .map(profile => {
                const structure = modules[profile.get('type')]
                if (!structure) {
                  return false
                }

                const { profile: profileStructure } = structure
                return (
                  <ListItem
                    key={profile.get('id')}
                    onClick={onSelectProfile(profile, profileStructure)}
                    className='d-flex flex-row align-items-center py-2'
                  >
                    <Avatar
                      title={profile.get('name')}
                      icon={profileStructure.logo.svg}
                      className={profileStructure.logo.className}
                    />
                    <div className='ml-3'>
                      <h6 className='pb-0 mb-n1'>
                        {profile.get('name')}
                      </h6>
                      <small>{profileStructure.name}</small>
                    </div>
                  </ListItem>
                )
              })
              .filter(Boolean)
          ) : (
            <ListItem>Você não possui perfis liberados.</ListItem>
          )}
        </List>
        <Button
          onClick={onLogout}
          className='btn btn-link text-primary font-weight-bold d-block w-100 text-left bg-logo'
        >
          <ExitToApp className='mr-2' style={{ transform: 'rotate(180deg)' }} />
          Sair
        </Button>
      </ListContainer>
    </Layout>
  )
}

Profiles.propTypes = {
  profile: PropTypes.object.isRequired
}

export default Profiles
