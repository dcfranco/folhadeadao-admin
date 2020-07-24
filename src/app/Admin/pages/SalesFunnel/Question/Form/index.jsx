import React, { Fragment, useCallback, useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { Field, Form, reduxForm } from 'redux-form/immutable'
import { Title, ColumnWrapper, ColumnLeft, ColumnRight, Container } from 'templates/PageTemplate'
import FormContent, { Row, Element } from 'components/FormContent'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import ReduxFormReactSelect from 'components/ReduxFormReactSelect'
import QuestionsFactory from 'factories/Questions'
import Button from 'components/Button'
import { questionCreateRequest, questionAsyncRequest, questionResetSelected,
  questionEditRequest } from 'admin/actions/questions'
import { categoriesAsyncRequest } from 'admin/actions/categories'
import { salesFunnelAsyncRequest } from 'admin/actions/sales-funnel'
import { questionTypesAsyncRequest } from 'admin/actions/question-types'
import ReduxFormInput from 'components/ReduxFormInput'
import ReduxFormTextArea from 'components/ReduxFormTextArea'
import ReduxFormCheckbox from 'components/ReduxFormCheckbox'
import { ToastContext } from 'components/ToastProvider'
import { required } from 'form/validators'
import { toNumber } from 'form/parsers'
import { Map } from 'immutable'
import SalesFunnelQuestionsSidePanel from '../SidePanel'

export const formName = 'newEditSalesFunnelForm'

const SalesFunnelForm = (
  { handleSubmit, submit, initialize, pristine, invalid }
) => {
  const funnel = useSelector(({ admin }) => admin.salesFunnel.getIn(['options', 'selected']))
  const question = useSelector(({ admin }) => admin.questions.getIn(['options', 'selected']))
  const { showErrorToast, showSuccessToast } = useContext(ToastContext)
  const [questionTypes, updateQuestionTypes] = useState([])
  const [categories, updateCategories] = useState([])
  const [isEditMode, toggleEditMode] = useState()
  const { funnelId, questionId } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(questionTypesAsyncRequest()).then((response) => {
      updateQuestionTypes(response.map(((r) => ({
        label: r.name,
        value: r.id
      }))))
    })
    dispatch(categoriesAsyncRequest()).then((response) => {
      updateCategories(response.map(((r) => ({
        label: r.categoria,
        value: r.ID
      }))))
    })
  }, [])

  useEffect(() => {
    if (questionId) {
      dispatch(questionAsyncRequest(questionId)).then((response) => {
        if (!response) {
          history.goBack()
          return
        }
        toggleEditMode(true)
      })
    } else {
      toggleEditMode(false)
      dispatch(questionResetSelected())
    }
  }, [questionId, toggleEditMode])

  useEffect(() => {
    if (isEditMode && question) {
      initialize(
        new Map({
          order: question.get('order'),
          description: question.get('description'),
          title: question.get('title'),
          isRequired: question.get('isRequired'),
          typeId: question.getAsSelectObject('type', 'ID', 'name'),
          maxSelectable: question.get('maxSelectable'),
          isActive: question.get('isActive'),
          createdAt: question.get('createdAt'),
          categoryId: question.getAsSelectObject('category', 'ID', 'categoria'),
          funnelId: question.get('funnelId')
        })
      )
    } else if (!isEditMode) {
      initialize(
        new Map({
          funnelId: funnel.get('id'),
          isActive: false,
          isRequired: false
        })
      )
    }
  }, [isEditMode, question])

  const onCancel = useCallback(() => {
    history.goBack()
  }, [])

  const onSave = useCallback(() => {
    dispatch(salesFunnelAsyncRequest(funnelId)).then(() => {
      history.goBack()
    })
  }, [funnelId, history, dispatch])

  const onSubmit = useCallback(async (values) => {
    if (questionId) {
      const request = QuestionsFactory.editRequest(values)
      const response = await dispatch(questionEditRequest(questionId, request))
      if (response) {
        showSuccessToast({ message: 'Etapa alterada com sucesso' })
        setTimeout(() => onSave(response.id))
        return
      }
    } else {
      const request = QuestionsFactory.createRequest(values)
      const response = await dispatch(questionCreateRequest(funnel.get('id'), request))
      if (response && response.id) {
        showSuccessToast({ message: 'Etapa criada com sucesso' })
        setTimeout(() => onSave(response.id))
        return
      }
    }
    showErrorToast({ message: 'Ocorreu um problema ao salvar a etapa, tente novamente.' })
  }, [questionId, dispatch])

  if (!funnel) {
    return null
  }

  return (
    <Fragment>
      <SalesFunnelQuestionsSidePanel freeze={true} />
      <ColumnWrapper>
        <ColumnLeft>
          <Title>{ isEditMode ? 'Alteração de Perguntas' : 'Cadastro de Perguntas' }</Title>
        </ColumnLeft>
        <ColumnRight isActionBar={true}>
          <Button className='btn btn-default mr-3' onClick={onCancel}>
            Voltar
          </Button>
          <Button onClick={() => submit()} disabled={invalid || (isEditMode && pristine)}>
            Salvar
          </Button>
        </ColumnRight>
      </ColumnWrapper>
      <Container isWhiteBackground={true} autofocus={true}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormContent title='Sobre a pergunta'>
            <Row>
              <Element lg='6'>
                <Field
                  type='text'
                  name='categoryId'
                  label='Categoria: *'
                  id='categoryId'
                  options={categories}
                  placeholder='Categoria'
                  component={ReduxFormReactSelect}
                  validate={[required]}
                />
              </Element>
              <Element lg='6'>
                <Field
                  type='text'
                  name='title'
                  label='Título: *'
                  id='title'
                  placeholder='Título'
                  component={ReduxFormInput}
                  validate={[required]}
                />
              </Element>
            </Row>
            <Row>
              <Element lg='6'>
                <Field
                  type='text'
                  name='typeId'
                  label='Tipo de Layout: *'
                  id='typeId'
                  options={questionTypes}
                  placeholder='Tipo de Layout'
                  component={ReduxFormReactSelect}
                  validate={[required]}
                />
              </Element>
              <Element lg='3'>
                <Field
                  type='number'
                  name='order'
                  label='Ordem: *'
                  id='order'
                  placeholder='Ordem'
                  parse={toNumber}
                  component={ReduxFormInput}
                  validate={[required]}
                />
              </Element>
              <Element lg='3'>
                <Field
                  type='number'
                  name='maxSelectable'
                  label='Número de Opções Selecionaveis: *'
                  id='maxSelectable'
                  placeholder='Quantidade'
                  parse={toNumber}
                  component={ReduxFormInput}
                  validate={[required]}
                />
              </Element>
            </Row>
            <Row>
              <Element lg='12'>
                <Field
                  name='description'
                  label='Descrição: *'
                  id='description'
                  placeholder='Descrição'
                  component={ReduxFormTextArea}
                  validate={[required]}
                />
              </Element>
            </Row>
            <Row>
              <Element lg='auto'>
                <div className='h-100 d-flex align-items-center'>
                  <Field
                    name='isRequired'
                    label='Obrigatório'
                    id='isRequired'
                    component={ReduxFormCheckbox}
                  />
                </div>
              </Element>
              <Element lg='auto'>
                <div className='h-100 d-flex align-items-center'>
                  <Field
                    name='isActive'
                    label='Ativado'
                    id='isActive'
                    component={ReduxFormCheckbox}
                  />
                </div>
              </Element>
            </Row>
          </FormContent>
        </Form>
      </Container>
    </Fragment>
  )
}

SalesFunnelForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  initialize: PropTypes.func.isRequired
}

export default reduxForm({
  form: formName
})(SalesFunnelForm)
