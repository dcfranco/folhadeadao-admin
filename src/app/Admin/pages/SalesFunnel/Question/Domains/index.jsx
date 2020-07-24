import React, { Fragment, useCallback, useState, useRef, useEffect, useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Field, Form, reduxForm } from 'redux-form/immutable'
import { Title, ColumnWrapper, ColumnLeft, ColumnRight, Container } from 'templates/PageTemplate'
import FormContent, { Row, Element } from 'components/FormContent'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import ReduxFormReactSelect from 'components/ReduxFormReactSelect'
import DomainsFactory from 'factories/Domains'
import Button from 'components/Button'
import { domainAsyncRequest, domainResetSelected, domainEditRequest,
  domainCreateRequest } from 'admin/actions/domains'
import ReduxFormInput from 'components/ReduxFormInput'
import { ToastContext } from 'components/ToastProvider'
import { required } from 'form/validators'
import { Map } from 'immutable'
import { bindPathParams } from 'helpers'
import { useImporter } from 'hooks'
import FileSearch from 'components/FileSearch'
import { uploaderAsyncRequest } from 'core/actions/uploader'
import SalesFunnelDomainsSidePanel from './SidePanel'

export const formName = 'newEditSalesFunnelDomainsForm'

const SalesFunnelDomainsForm = (
  { handleSubmit, submit, initialize, pristine, invalid, profile: { pages } }
) => {
  const domain = useSelector(({ admin }) => admin.domains.getIn(['options', 'selected']))
  const questions = useSelector(({ admin }) => admin.questions.getIn(['options', 'selected']))
  const domainTypesJs = useSelector(({ admin }) => admin.domainTypes.getAsSelectList('name', 'id'))
  const { showErrorToast, showSuccessToast } = useContext(ToastContext)
  const [isEditMode, toggleEditMode] = useState()
  const { funnelId, questionId, domainId } = useParams()
  const [isInvalid, setIsInvalid] = useState(false)
  const [hasPreview, toggleHasPreview] = useState(false)
  const importer = useImporter()
  const dispatch = useDispatch()
  const history = useHistory()
  const previewRef = useRef()
  const fileRef = useRef()

  const onLoadFile = useCallback(({ currentTarget: { files } }) => {
    importer.img(files[0]).then(({ value }) => {
      if (value) {
        const [file] = files
        previewRef.current.src = value
        fileRef.current = file
        setIsInvalid(false)
        toggleHasPreview(true)
      } else {
        setIsInvalid(true)
      }
    })
  }, [importer, toggleHasPreview, setIsInvalid])

  const backRoute = useMemo(() => bindPathParams({
    funnelId,
    questionId
  }, pages.FUNNELS.QUESTION.VIEW), [funnelId, questionId])

  useEffect(() => {
    if (domainId) {
      dispatch(domainAsyncRequest(domainId)).then((response) => {
        if (!response || !questions) {
          history.push(backRoute)
          return
        }
        toggleEditMode(true)
      })
    } else {
      toggleEditMode(false)
      dispatch(domainResetSelected())
    }
  }, [domainId, toggleEditMode])

  useEffect(() => {
    if (isEditMode && domain) {
      initialize(
        new Map({
          domainTypeId: domain.getAsSelectObject('domainType', 'id', 'name'),
          imageUrl: domain.get('imageUrl'),
          questionId: domain.get('questionId'),
          value: domain.get('value'),
          label: domain.get('label'),
          tagReference: domain.get('tagReference'),
          className: domain.get('className')
        })
      )
    } else if (!isEditMode) {
      initialize(
        new Map({
          questionId
        })
      )
    }
  }, [isEditMode, domain])

  const onCancel = useCallback(() => {
    history.push(backRoute)
  }, [backRoute])

  const onSave = useCallback(() => {
    dispatch(domainAsyncRequest(domainId)).then(() => {
      history.push(backRoute)
    })
  }, [domainId, history, backRoute, dispatch])

  const uploadImage = useCallback(() => {
    return new Promise((resolve) => {
      const { current: file } = fileRef
      if (file) {
        dispatch(uploaderAsyncRequest(file)).then((response) => resolve(response))
      } else {
        resolve(null)
      }
    })
  }, [dispatch])

  const onSubmit = useCallback(async (values) => {
    const hasChangedImage = await uploadImage()
    if (domainId) {
      const request = DomainsFactory.editRequest(values)
      const response = await dispatch(domainEditRequest(domainId, request))
      if (response) {
        showSuccessToast({ message: 'Pergunta alterada com sucesso, agora cadastre as respostas' })
        setTimeout(() => onSave(response.id))
        return
      }
    } else {
      const request = DomainsFactory.createRequest(values)
      const response = await dispatch(domainCreateRequest(questionId, request))
      if (response && response.id) {
        showSuccessToast({ message: 'Pergunta criada com sucesso, agora cadastre as respostas' })
        setTimeout(() => onSave(response.id))
        return
      }
    }
    showErrorToast({ message: 'Ocorreu um problema ao salvar a pergunta, tente novamente.' })
  }, [domainId, questionId, dispatch])

  if (domainId && !domain) {
    return null
  }

  return (
    <Fragment>
      <SalesFunnelDomainsSidePanel backRoute={backRoute} />
      <ColumnWrapper>
        <ColumnLeft>
          <Title>{ isEditMode ? domain.get('label') : 'Cadastro de Opções' }</Title>
        </ColumnLeft>
        <ColumnRight isActionBar={true}>
          <Button className='btn btn-default mr-3' onClick={onCancel}>
            Voltar
          </Button>
          <Button
            onClick={() => submit()}
            disabled={invalid || (isEditMode && pristine && !hasPreview)}
          >
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
                  name='label'
                  label='Identificador: *'
                  id='label'
                  placeholder='Identificador'
                  component={ReduxFormInput}
                  validate={[required]}
                />
              </Element>
              <Element lg='6'>
                <Field
                  type='text'
                  name='value'
                  label='Valor: *'
                  id='value'
                  placeholder='Valor'
                  component={ReduxFormInput}
                  validate={[required]}
                />
              </Element>
            </Row>
            <Row>
              <Element lg='6'>
                <Field
                  type='text'
                  name='domainTypeId'
                  label='Tipo de Resposta: *'
                  id='domainTypeId'
                  options={domainTypesJs}
                  placeholder='Tipo de Layout'
                  component={ReduxFormReactSelect}
                  validate={[required]}
                />
              </Element>
              <Element lg='3'>
                <Field
                  type='text'
                  name='tagReference'
                  label='Tags: *'
                  id='tagReference'
                  placeholder='Tags'
                  component={ReduxFormInput}
                  validate={[required]}
                />
              </Element>
              <Element lg='3'>
                <Field
                  type='text'
                  name='className'
                  label='Classe CSS:'
                  id='className'
                  placeholder='Classe CSS'
                  component={ReduxFormInput}
                />
              </Element>
            </Row>
            <Row>
              <Element lg='6'>
                <Field
                  type='file'
                  name='imageFile'
                  label='Imagem'
                  id='imageFile'
                  onChange={onLoadFile}
                  component='input'
                />
              </Element>
            </Row>
          </FormContent>
          <FormContent title='Preview'>
            <Row>
              <Element lg='12'>
                <img
                  ref={previewRef}
                  alt='Preview'
                  src=''
                  className={!hasPreview ? 'd-none' : 'img-thumbnail'}
                  style={{ maxHeight: 150 }}
                />
                { !hasPreview && (<span>Nenhuma imagem carregada</span>)}
                { isInvalid && (<span className='d-block ml-3 font-weight-bold'>Imagem inválida</span>)}
              </Element>
            </Row>
          </FormContent>
        </Form>
      </Container>
    </Fragment>
  )
}

SalesFunnelDomainsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  initialize: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

export default reduxForm({
  form: formName
})(SalesFunnelDomainsForm)
