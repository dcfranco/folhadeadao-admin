import React, { Fragment, useCallback } from 'react'
import { Title, ColumnWrapper, ColumnLeft, ColumnRight, Container } from 'templates/PageTemplate'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Button from 'components/Button'
import SalesFunnelQuestionsSidePanel from '../SidePanel'

const SalesFunnelDetails = () => {
  const funnel = useSelector(({ admin }) => admin.salesFunnel.getIn(['options', 'selected']))
  const history = useHistory()

  const onCancel = useCallback(() => {
    history.goBack()
  }, [])

  if (!funnel) {
    return null
  }

  return (
    <Fragment>
      <SalesFunnelQuestionsSidePanel />
      <ColumnWrapper>
        <ColumnLeft>
          <Title>Detalhes do Funíl</Title>
        </ColumnLeft>
        <ColumnRight isActionBar={true}>
          <Button className='btn btn-default' onClick={onCancel}>
            Voltar
          </Button>
        </ColumnRight>
      </ColumnWrapper>
      <Container isWhiteBackground={true} autofocus={true}>
        Teste
      </Container>
    </Fragment>
  )
}

SalesFunnelDetails.propTypes = {
}

export default SalesFunnelDetails
