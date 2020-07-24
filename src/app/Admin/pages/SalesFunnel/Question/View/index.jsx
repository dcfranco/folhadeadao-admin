import React, { Fragment, useCallback, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { Title, ColumnWrapper, ColumnLeft, ColumnRight, Container } from 'templates/PageTemplate'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import Button from 'components/Button'
import { questionAsyncRequest } from 'admin/actions/questions'
import { bindPathParams } from 'helpers'
import ViewTable, { ViewTableRow, ViewTableCell } from 'components/ViewTable'
import { ToastContext } from 'components/ToastProvider'
import { Edit } from '@material-ui/icons'
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell
} from 'components/Table'
import SalesFunnelQuestionsSidePanel from '../SidePanel'

const SalesFunnelForm = ({ profile: { pages } }) => {
  const funnel = useSelector(({ admin }) => admin.salesFunnel.getIn(['options', 'selected']))
  const question = useSelector(({ admin }) => admin.questions.getIn(['options', 'selected']))
  const { showErrorToast } = useContext(ToastContext)
  const { funnelId, questionId } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (questionId) {
      dispatch(questionAsyncRequest(questionId)).then((response) => {
        if (!response) {
          showErrorToast({ message: 'A pergunta não foi encontrada' })
          history.goBack()
        }
      })
    }
  }, [questionId])

  const onEditClick = useCallback(() => {
    const route = bindPathParams(
      {
        questionId,
        funnelId
      },
      pages.FUNNELS.QUESTION.EDIT
    )
    history.push(route)
  }, [funnelId, questionId])

  const onDomainEditClick = useCallback((domainId) => () => {
    const route = bindPathParams(
      {
        questionId,
        funnelId,
        domainId
      },
      pages.FUNNELS.QUESTION.EDIT_DOMAIN
    )
    history.push(route)
  }, [funnelId, questionId])

  const onCreateDomainClick = useCallback(() => {
    const route = bindPathParams({
      questionId,
      funnelId
    }, pages.FUNNELS.QUESTION.NEW_DOMAIN)
    history.push(route)
  }, [funnelId, questionId])

  if (!funnel || !question) {
    return null
  }

  const domains = question.get('domains')

  return (
    <Fragment>
      <SalesFunnelQuestionsSidePanel />
      <ColumnWrapper>
        <ColumnLeft>
          <Title>Funil {`${funnel.get('name')}`} - Etapa {`${question.get('order')}`}</Title>
          { !question.get('isActive') && (
            <small className='font-weight-bold text-danger m-0 p-0'>Essa etapa não está ativa, por tanto não aparecerá no funil.</small>
          ) }
        </ColumnLeft>
        <ColumnRight isActionBar={true}>
          <Button className='btn btn-secondary mr-2' onClick={onCreateDomainClick}>Nova Opção</Button>
          <Button onClick={onEditClick}>Editar</Button>
        </ColumnRight>
      </ColumnWrapper>
      <Container isWhiteBackground={true}>
        <ViewTable title='Detalhes' className='mb-0'>
          <ViewTableRow>
            <ViewTableCell className='w-md-25' label='Título' value={question.get('title')} />
            <ViewTableCell
              className='w-md-25'
              label='É obrigatória?'
              value={question.getBooleanAsYesOrNo('isRequired')}
            />
            <ViewTableCell
              className='w-md-25'
              label='Número de opções selecionaveis'
              value={question.get('maxSelectable')}
            />
            <ViewTableCell
              className='w-md-25'
              label='Está ativo?'
              valueClassName={question.get('isActive') ? 'text-green' : 'text-danger'}
              value={question.getBooleanAsYesOrNo('isActive')}
            />
          </ViewTableRow>
          <ViewTableRow>
            <ViewTableCell
              className='w-md-33'
              label='Criado em'
              value={question.getFormatedDate('createdAt')}
            />
            <ViewTableCell
              className='w-md-33'
              label='Categoria'
              value={question.getIn(['category', 'categoria'])}
            />
            <ViewTableCell
              className='w-md-33'
              label='Tipo de layout'
              value={question.getIn(['type', 'name'])}
            />
          </ViewTableRow>
          <ViewTableRow>
            <ViewTableCell
              className='w-100'
              label='Descrição'
              value={question.get('description')}
            />
          </ViewTableRow>
        </ViewTable>
      </Container>

      { domains && domains.size > 0 && (
        <Fragment>
          <Title className='mt-4 mb-3'>Opções</Title>
          <Container className='p-0'>
            <Table className='min-width-sm mt-4 mt-lg-0'>
              <TableHead>
                <TableHeader>Identificador</TableHeader>
                <TableHeader>Valor</TableHeader>
                <TableHeader>Tags</TableHeader>
                <TableHeader>Imagem</TableHeader>
                <TableHeader isAction={true} />
              </TableHead>
              <TableBody>
                {domains.map((domain) => {
                  const id = domain.get('id')
                  return (
                    <TableRow key={id}>
                      <TableCell>{domain.get('label')}</TableCell>
                      <TableCell>{domain.get('value')}</TableCell>
                      <TableCell>{domain.get('tagReference')}</TableCell>
                      <TableCell>{domain.get('imageUrl')}</TableCell>
                      <TableCell className='text-center' onClick={onDomainEditClick(id)}>
                        <Edit className='mx-auto svg-action' />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </Container>
        </Fragment>
      )}
    </Fragment>
  )
}

SalesFunnelForm.propTypes = {
  profile: PropTypes.object.isRequired
}

export default SalesFunnelForm
