// @flow
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form/immutable'
import Image from 'components/Image'
import { CleanTemplate } from 'templates'
import { required } from 'form/validators'
import { RemoveRedEyeOutlined } from '@material-ui/icons'
import { userAsyncRequest } from 'core/actions/user'

import ReduxFormInput from 'components/ReduxFormInput'
import ReduxFormInputBuilder from 'components/ReduxFormInput/Builder'
import InputAddonBuilder from 'components/ReduxFormInput/builders/InputAddonBuilder'

import type { TDefaultPageProps } from 'default/types'

const { AVAILABLE_IMAGES } = Image
const { Layout, Logo, Container, Content, Title } = CleanTemplate

type TPageProps = {
  ...TDefaultPageProps,
  handleSubmit: Function
}

const InputAddon = InputAddonBuilder()
  .rightPosition()
  .renderMethod(() => (
    <div className='icon-right-addon'>
      <RemoveRedEyeOutlined />
    </div>
  ))
  .build()

const ReduxFormInputWithAddon = ReduxFormInputBuilder()
  .rightAddon(InputAddon)
  .isDetailError()
  .build()

const Login = ({ handleSubmit, profile: { pages } }: TPageProps) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [isPasswordEyeActive, togglePasswordEyeActive] = useState(false)
  const onSubmit = async values => {
    const response = await dispatch(
      userAsyncRequest(values.get('email'), values.get('password'))
    )
    if (response) {
      setTimeout(() => history.push(pages.PROFILES))
    }
  }

  return (
    <Layout className='login'>
      <Container>
        <Content className='py-5 px-2 px-md-3'>
          <Logo className='mt-2 mb-4'>
            <Image
              src={AVAILABLE_IMAGES.LOGO}
              maxWidth='60%'
            />
          </Logo>
          <Title>Login do sistema</Title>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Field
              type='text'
              placeholder='E-mail'
              name='email'
              id='email'
              component={ReduxFormInput}
              className='form-control-lg'
              validate={required}
              inputMode='email'
              hideError={true}
              isDetailError={true}
            />
            <Field
              type={isPasswordEyeActive ? 'text' : 'password'}
              placeholder='Senha'
              name='password'
              id='password'
              component={ReduxFormInputWithAddon}
              className='form-control-lg'
              validate={required}
              onRightAddonClick={() =>
                togglePasswordEyeActive(!isPasswordEyeActive)
              }
            />
            <div className='row justify-content-space-between mt-n2 mb-4 pb-3'>
              <div className='col-12 text-right'>
                <Link to={pages.INDEX} className='text-primary font-weight-regular font-size-md'>
                  Esqueceu a senha?
                </Link>
              </div>
            </div>
            <div className='row justify-content-space-between flex-column-reverse flex-md-row mt-md-4'>
              <div className='col-12 col-md-7 mx-auto text-center'>
                <button
                  className='btn btn-primary btn-lg px-4 w-100'
                  type='submit'
                >
                  Acessar
                </button>
              </div>
            </div>
          </form>
        </Content>
      </Container>
    </Layout>
  )
}

export default reduxForm({
  form: 'loginForm'
})(Login)
