/* eslint-disable no-restricted-syntax */
// @flow
import React from 'react'
import Image from 'components/Image'
import { CleanTemplate } from 'templates'

const { AVAILABLE_IMAGES } = Image
const { Layout, Container, HeaderLogo } = CleanTemplate

type TRegistrationProps = {
  children: any,
}
const Registration = ({ children }: TRegistrationProps) => {
  return (
    <Layout className='registration'>
      <Container size='col-12 col-md-5'>
        <HeaderLogo>
          <Image src={AVAILABLE_IMAGES.LOGO_WHITE} maxWidth='170px' />
        </HeaderLogo>
        { children }
      </Container>
    </Layout>
  )
}

export default Registration
