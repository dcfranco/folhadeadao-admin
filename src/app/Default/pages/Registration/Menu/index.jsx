// @flow
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ArrowForward } from '@material-ui/icons'

import CleanTemplate from 'templates/CleanTemplate'

import type { TRegistrationPageProps } from 'default/types'

const { Content, HeaderTitle } = CleanTemplate

const MenuRegistration = ({ profile: { pages } }: TRegistrationPageProps) => {
  return (
    <Fragment>
      <Content>
        <HeaderTitle linkTo={pages.LOGIN}>Cadastre-se</HeaderTitle>
        <div className='action-items'>
          <Link to={pages.REGISTRATION.REGISTER}>
            Quero consultar um CPF ou CNPJ
            <ArrowForward />
          </Link>
          <Link to={pages.REGISTRATION.REGISTER}>
            Quero me tornar um cliente
            <ArrowForward />
          </Link>
        </div>
      </Content>
    </Fragment>
  )
}

MenuRegistration.propTypes = {
  profile: PropTypes.object.isRequired
}

export default MenuRegistration
