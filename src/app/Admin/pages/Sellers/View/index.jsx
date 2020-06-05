import React, { Fragment, useEffect, useContext, useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { ColumnWrapper, ColumnLeft, ColumnRight, Container, HeaderInfo } from 'templates/PageTemplate'
import ViewTable, { ViewTableRow, ViewTableCell } from 'components/ViewTable'
import { ToastContext } from 'components/ToastProvider'
import { sellersAsyncRequest, sellerAsyncRequest, sellerResetSelected, sellerDeleteRequest } from 'admin/actions/sellers'
import UserInfo from 'components/UserInfo'
import Button from 'components/Button'
import { bindPathParams } from 'helpers'
import CreateGenericConfirmModal from 'components/GenericConfirmModal'

import SellerViewSidePanel from './SidePanel'

const ConfirmDemissionModal = CreateGenericConfirmModal({
  confirmBtnClassName: 'btn-danger',
  cancelOnClose: true
})

const SellersView = ({ profiles: { pages } }) => {
  const { showSuccessToast, showErrorToast } = useContext(ToastContext)
  const [isDemissionModalOpen, toggleDemissionModal] = useState(false)
  const { sellerId } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const seller = useSelector(({ admin }) => admin.sellers.getIn(['options', 'selected']))
  const sellers = useSelector(({ admin }) => admin.sellers.get('results'))

  const sellerNotFound = () => {
    showErrorToast({
      message: 'Funcionário não encontrado!'
    })
    history.push(pages.SELLERS.INDEX)
  }

  useEffect(() => () => dispatch(sellerResetSelected()), [])

  useEffect(() => {
    if (!sellerId) {
      sellerNotFound()
    } else {
      dispatch(sellerAsyncRequest(sellerId)).then((response) => {
        if (!response) {
          sellerNotFound()
        } else if (sellers.size === 0) {
          dispatch(sellersAsyncRequest())
        }
      })
    }
  }, [sellerId])

  const onDemissionConfirm = useCallback(async () => {
    const firedDate = moment().format('DD/MM/YYYY')
    toggleDemissionModal(false)
    const response = await dispatch(sellerDeleteRequest(seller.get('id'), firedDate, 0))
    if (response) {
      showSuccessToast({
        message: 'Funcionário demitido com sucesso!'
      })
      dispatch(sellerAsyncRequest(sellerId))
    } else {
      showErrorToast({
        message: 'Ocorreu um problema, tente novamente mais tarde'
      })
    }
  }, [seller, sellerId])

  const onDemissionClose = useCallback(() => {
    toggleDemissionModal(false)
  }, [])

  const onSellerFireClick = useCallback(() => {
    if (seller.hasContracts()) {
      const route = bindPathParams({
        sellerId: seller.get('id')
      }, pages.SELLERS.DEMISSION.INFORM)
      history.push(route)
    } else {
      toggleDemissionModal(true)
    }
  }, [seller])

  const onSellerEditClick = useCallback(() => {
    const route = bindPathParams({
      sellerId: seller.get('id')
    }, pages.SELLERS.EDIT)
    history.push(route)
  }, [seller])

  if (!seller) {
    return null
  }

  const status = seller.get('status')
  const fullname = seller.getFullName()
  const hasAccess = seller.get('possui_acesso')

  return (
    <Fragment>
      <SellerViewSidePanel />
      <ColumnWrapper className='mb-2 mt-4'>
        <ColumnLeft>
          <div className='d-flex align-items-center h-100'>
            <div
              className={classNames('px-3 py-1 text-white text-center rounded', {
                'bg-danger': !hasAccess,
                'bg-success': hasAccess
              })}
            >
              { hasAccess ? 'Desbloqueado' : 'Bloqueado' }
            </div>
            <div
              className={classNames('ml-3 px-3 py-1 text-white text-center rounded', {
                'bg-warning': status !== 'ativo',
                'bg-success': status === 'ativo'
              })}
            >
              { `${status.charAt(0).toUpperCase()}${status.slice(1)}` }
            </div>
          </div>
        </ColumnLeft>
        <ColumnRight isActionBar={true}>
          <Button type='button' className='btn btn-link' onClick={onSellerFireClick}>
            Demitir
          </Button>
          <Button type='button' className='btn btn-default' onClick={onSellerEditClick}>
            Editar
          </Button>
        </ColumnRight>
      </ColumnWrapper>

      <ColumnWrapper className='mt-0 mb-4 d-flex flex-column flex-md-row'>
        <ColumnLeft>
          <UserInfo
            className='font-size-xl'
            avatarClassName='text-dark border-dark'
            infoClassName='text-low-dark'
            fullName={fullname}
          >
            { `CPF: ${seller.get('cpf')}` }
          </UserInfo>
        </ColumnLeft>
        <ColumnRight>
          <div className='d-flex justify-content-between justify-content-md-end flex-wrap'>
            <HeaderInfo
              title='Margem Disponível'
              className='mt-3 mt-md-0 pr-2'
            >
              { seller.getFormatedCurrency('margem_disponivel') }
            </HeaderInfo>
            <HeaderInfo
              title='Matrícula'
              className='mt-3 mt-md-0 ml-md-4 pr-2'
            >
              { `#${seller.get('matricula')}` }
            </HeaderInfo>
            <HeaderInfo
              title='Data de Admissão'
              className='mt-3 mt-md-0 ml-md-4 pr-2'
            >
              { seller.getFormatedDate('admitido_em') }
            </HeaderInfo>
          </div>
        </ColumnRight>
      </ColumnWrapper>
      <Container isWhiteBackground={true}>
        <ViewTable title='Condições Gerais'>
          <ViewTableRow>
            <ViewTableCell className='w-md-33' label='Data de nascimento' value={seller.getFormatedDate('nascimento')} />
            <ViewTableCell className='w-md-33' label='Sexo' value={seller.get('sexo')} />
            <ViewTableCell className='w-md-33' label='Número de dependentes' value={seller.get('dependentes')} />
          </ViewTableRow>
        </ViewTable>

        <ViewTable title='Detalhes do Funcionário'>
          <ViewTableRow>
            <ViewTableCell className='w-md-25' label='Cargo' value={seller.get('cargo')} />
            <ViewTableCell className='w-md-25' label='Data de admissão' value={seller.getFormatedDate('admitido_em')} />
            <ViewTableCell className='w-md-25' label='Percentual comprometido' value={seller.getCompromisedPercent()} />
            <ViewTableCell className='w-md-25' label='Salário base por mês' value={seller.getFormatedCurrency('salario')} />
          </ViewTableRow>
          <ViewTableRow>
            <ViewTableCell className='w-md-33' label='Desconto INSS' value={seller.getFormatedCurrency('inss')} />
            <ViewTableCell className='w-md-33' label='Desconto IRRF' value={seller.getFormatedCurrency('irrf')} />
            <ViewTableCell className='w-md-33' label='Empréstimos em outros bancos' value={seller.getFormatedCurrency('valor_emprestado_outros_bancos')} />
          </ViewTableRow>
          <ViewTableRow>
            <ViewTableCell className='w-md-100' label='E-mail' value={seller.get('email')} />
          </ViewTableRow>
        </ViewTable>

        <ViewTable title='Dados para Pagamento'>
          <ViewTableRow>
            <ViewTableCell className='w-md-25' label='Banco' value={seller.getIn(['pagamento', 'banco'])} />
            <ViewTableCell className='w-md-25' label='Agência' value={seller.getIn(['pagamento', 'agencia'])} />
            <ViewTableCell className='w-md-25' label='Conta' value={seller.getIn(['pagamento', 'conta'])} />
            <ViewTableCell className='w-md-25' label='Tipo de conta' value={seller.getIn(['pagamento', 'tipo'])} />
          </ViewTableRow>
        </ViewTable>

        <ViewTable title='Endereço'>
          <ViewTableRow>
            <ViewTableCell className='w-md-25' label='CEP' value={seller.getIn(['endereco', 'cep'])} />
            <ViewTableCell className='w-md-25' label='Cidade' value={seller.getIn(['endereco', 'cidade'])} />
            <ViewTableCell className='w-md-25' label='UF' value={seller.getIn(['endereco', 'uf'])} />
            <ViewTableCell className='w-md-25' label='Bairro' value={seller.getIn(['endereco', 'bairro'])} />
          </ViewTableRow>
          <ViewTableRow>
            <ViewTableCell className='w-md-25' label='Número' value={seller.getIn(['endereco', 'numero'])} />
            <ViewTableCell className='w-md-25' label='Complemento' value={seller.getIn(['endereco', 'complemento'])} />
            <ViewTableCell className='w-md-50' label='Endereço' value={seller.getIn(['endereco', 'logradouro'])} />
          </ViewTableRow>
        </ViewTable>

        <ViewTable title='Contato'>
          <ViewTableRow>
            <ViewTableCell className='w-md-100' label='Celular' value={seller.getFormatedPhone('telefone_celular')} />
          </ViewTableRow>
        </ViewTable>

        <ViewTable title='Contato para Referência'>
          <ViewTableRow>
            <ViewTableCell className='w-md-33' label='Nome completo' value={seller.get('referencia_nome')} />
            <ViewTableCell className='w-md-33' label='Parentesco' value={seller.get('referencia_parentesco')} />
            <ViewTableCell className='w-md-33' label='Telefone' value={seller.getFormatedPhone('referencia_telefone')} />
          </ViewTableRow>
        </ViewTable>
      </Container>
      <ConfirmDemissionModal
        onConfirm={onDemissionConfirm}
        onCancel={onDemissionClose}
        isOpen={isDemissionModalOpen}
      >
        <span>
          Deseja confirmar a demissão de <strong>{ `${fullname}` }</strong>?
        </span>
      </ConfirmDemissionModal>
    </Fragment>
  )
}

SellersView.propTypes = {
  profiles: PropTypes.object.isRequired
}

export default React.memo(SellersView)
