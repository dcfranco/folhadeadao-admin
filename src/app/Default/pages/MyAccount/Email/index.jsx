import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { submit, isPristine, isInvalid } from 'redux-form/immutable'
import Layout, { ColumnWrapper, ColumnLeft, ColumnRight, Title, BackLink } from 'templates/PageTemplate'
import Button from 'components/Button'

export const formName = 'emailMyAccountForm'

const MyAccountEmail = ({ children }) => {
  const history = useHistory()
  const route = history.getStructure()
  const dispatch = useDispatch()
  const pristine = useSelector(state => isPristine(formName)(state))
  const invalid = useSelector(state => isInvalid(formName)(state))

  return (
    <Layout>
      <ColumnWrapper>
        <ColumnLeft>
          <BackLink onClick={() => history.goBack()}>
            voltar
          </BackLink>
          <Title>{ route.name }</Title>
        </ColumnLeft>
        <ColumnRight>
          <Button
            disabled={pristine || invalid}
            onClick={() => dispatch(submit(formName))}
          >
            Confirmar
          </Button>
        </ColumnRight>
      </ColumnWrapper>
      { children }
    </Layout>
  )
}

MyAccountEmail.propTypes = {
  children: PropTypes.node.isRequired
}

export default MyAccountEmail
