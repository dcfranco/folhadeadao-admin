import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useProfile, useStructure } from 'hooks'
import Dropdown, { DropdownAction, DropdownHeader } from 'components/Dropdown'
import { userLogout, userSelectProfile } from 'core/actions/user'
import { useDispatch } from 'react-redux'

import { EProfileKeys } from 'constants/profile'

import {
  // AccountBox,
  SupervisorAccount,
  ExitToApp
} from '@material-ui/icons'

const Menu = ({ dropdownRef, user }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const profiles = useProfile()
  const structure = useStructure()
  const defaultStructure = profiles[EProfileKeys.DEFAULT].profile
  const { pages } = defaultStructure

  const userFullName = user.getFullName()

  // const onMyAccountAction = useCallback(() => {
  //   const { pages: structurePages } = structure
  //   dropdownRef.current.hide()
  //   history.push(structurePages.MY_ACCOUNT.INDEX)
  // }, [structure])

  const onChangeProfileAction = useCallback(() => {
    dispatch(userSelectProfile(null))
    history.push(pages.PROFILES)
  }, [dispatch])

  const onLogoutAction = useCallback(() => {
    dispatch(userLogout())
    history.push(pages.LOGIN)
  }, [dispatch])

  return (
    <Dropdown ref={dropdownRef}>
      <DropdownHeader className='flex-column pl-5'>
        <div className='pl-2'>
          <span className='d-block'>
            { userFullName }
          </span>
          <span className='d-block opacity-05 small-line-height'>
            { structure.name }
          </span>
        </div>
      </DropdownHeader>
      {/* <DropdownAction
        onClick={onMyAccountAction}
        icon={AccountBox}
        className='pl-2'
      >
        Minha Conta
      </DropdownAction> */}
      { user.get('profiles').size > 1 && (
        <DropdownAction
          onClick={onChangeProfileAction}
          icon={SupervisorAccount}
          className='pl-2'
        >
          Trocar de perfil
        </DropdownAction>
      ) }
      <DropdownAction
        onClick={onLogoutAction}
        icon={ExitToApp}
        className='pl-2 exit'
      >
        Sair
      </DropdownAction>
    </Dropdown>
  )
}

Menu.propTypes = {
  user: PropTypes.object.isRequired,
  dropdownRef: PropTypes.object.isRequired
}

export default React.memo(Menu)
