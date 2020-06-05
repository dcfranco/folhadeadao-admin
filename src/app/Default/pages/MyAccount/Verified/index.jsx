import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { range } from 'lodash'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Layout, { ColumnWrapper, ColumnLeft, Title } from 'templates/PageTemplate'
import { ToastContext } from 'components/ToastProvider'
import VerifiedArea from 'default/components/VerifiedArea'

import { myAccountEmailSendToken, myAccountPhoneSendToken } from 'default/actions/myAccount'

const MyAccountVerified = ({ profile: { pages } }) => {
  const { showSuccessToast } = useContext(ToastContext)
  const user = useSelector(state => state.user.get('data'))
  const history = useHistory()
  const dispatch = useDispatch()

  return (
    <Layout>
      <ColumnWrapper>
        <ColumnLeft>
          <Title>Minha Conta</Title>
        </ColumnLeft>
      </ColumnWrapper>
      <VerifiedArea
        label='E-mail'
        isVerified={user.get('email_verificado')}
        onValidate={async () => {
          const email = user.get('email')
          const response = await dispatch(myAccountEmailSendToken(email))
          if (response) {
            showSuccessToast({
              message: 'Token enviado'
            })
            history.push(pages.MY_ACCOUNT.EMAIL.TOKEN, {
              email
            })
          }
        }}
        onEdit={() => {
          history.push(pages.MY_ACCOUNT.EMAIL.INDEX)
        }}
      >
        { user.get('email') }
      </VerifiedArea>
      <VerifiedArea
        label='Contato'
        isVerified={user.get('telefone_celular_verificado')}
        onValidate={async () => {
          const phone = user.get('telefone_celular')
          const response = await dispatch(myAccountPhoneSendToken(phone))
          if (response) {
            showSuccessToast({
              message: 'Token enviado'
            })
            history.push(pages.MY_ACCOUNT.CONTACT.TOKEN, {
              phone
            })
          }
        }}
        onEdit={() => {
          history.push(pages.MY_ACCOUNT.CONTACT.INDEX)
        }}
      >
        { user.getFormatedPhone('telefone_celular') }
      </VerifiedArea>
      <VerifiedArea
        label='Redefinir Senha'
        isVerified={true}
        hideStatus={true}
        onEdit={() => {
          history.push(pages.MY_ACCOUNT.PASSWORD)
        }}
      >
        <div className='d-flex mt-2 ml-n1'>
          { range(1, 10).map((obj) => <div className='password' key={obj} />) }
        </div>
      </VerifiedArea>
    </Layout>
  )
}

MyAccountVerified.propTypes = {
  profile: PropTypes.object.isRequired
}

export default MyAccountVerified
