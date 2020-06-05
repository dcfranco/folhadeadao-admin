import React, { useContext, useRef } from 'react'
import classNames from 'classnames'
import SvgImage from 'components/SvgImage'
import Image from 'components/Image'
import { useStructure } from 'hooks'
import { useSelector } from 'react-redux'
import { getFirstLetters } from 'helpers'

import {
  Menu,
  Search,
  AccountCircle,
  Notifications,
  KeyboardArrowDown
} from '@material-ui/icons'

import { SideNavigationContext } from './SideNavigation'
import MainMenu from './Menu'

const Header = () => {
  const dropdown = useRef()
  const { toggleSideNavigation, isSideNavigationVisible } = useContext(SideNavigationContext)

  const structure = useStructure()
  const user = useSelector(state => state.user.get('data'))
  const profile = useSelector(state => state.user.getIn(['options', 'selectedProfile']))

  const userFullName = user.getFullName()
  const { small } = structure
  return (
    <header>
      <div className='navbar navbar-dark bg-secondary navbar-xl-light bg-xl-white fixed-top shadow-md'>
        <div className='row w-100 no-gutters'>
          <div className='col-12'>
            { /* Mobile Navbar */ }
            <div className='d-flex d-xl-none w-100 align-items-center'>
              { /* Mobile Left Navbar */ }
              <div className='d-flex text-white mr-auto'>
                <button className='navbar-toggler p-0 border-0 text-white' type='button'>
                  <Menu className='font-size-3xl' onClick={() => toggleSideNavigation(!isSideNavigationVisible)} />
                </button>
                <div
                  className={classNames('navbar-small-logo ml-2', small.className, {
                    'is-hided': isSideNavigationVisible
                  })}
                >
                  {small.svg && <SvgImage icon={small.svg} isOverflowHideen={true} /> }
                  {small.image && <Image src={small.image} isOverflowHideen={true} />}
                </div>
              </div>
              { /* Mobile Right Navbar */ }
              <div className='d-flex text-white ml-auto mr-2'>
                <div className='border-left border-white px-2'>
                  <Search className='font-size-3xl' />
                </div>
                <div
                  role='presentation'
                  className='border-left border-white pl-2'
                  onClick={(ev) => dropdown.current.show(ev)}
                >
                  <AccountCircle
                    className='font-size-3xl'
                  />
                </div>
              </div>
            </div>

            { /* Desktop Navbar */ }
            <div className='d-none d-xl-flex w-100 align-items-center'>
              { /* Desktop Left Navbar */ }
              <div className='d-flex text-dark mr-auto ml-3'>
                <div id='search-form-render' />
              </div>
              { /* Desktop Right Navbar */ }
              <div className='d-flex text-dark ml-auto mr-2'>
                <div className='d-flex flex-row-reverse'>
                  <div
                    role='presentation'
                    onClick={(ev) => dropdown.current.show(ev)}
                    className='d-flex flex-row-reverse font-size-sm border-left border-low-dark navbar-actions'
                  >
                    <div className='d-flex align-items-center navbar-actions-arrow'>
                      <KeyboardArrowDown className='text-low-dark' />
                    </div>
                    <div className='navbar-user-avatar'>
                      <h6 className='text-primary p-0 m-0'>
                        { getFirstLetters(user.get('nome'), user.get('sobrenome')) }
                      </h6>
                    </div>
                    <div className='d-flex flex-column justify-content-center text-right mr-3 pl-3'>
                      <span className='d-block font-weight-bold small-line-height'>
                        { userFullName }
                      </span>
                      <span className='d-block small-line-height mt-1'>
                        { profile.get('name') }
                      </span>
                    </div>
                  </div>
                  <div
                    className='d-flex align-items-center justify-content-center border-left border-low-dark px-3 font-size-sm navbar-notifications'
                  >
                    <Notifications className='text-low-dark' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MainMenu dropdownRef={dropdown} user={user} />
    </header>
  )
}

export default React.memo(Header)
