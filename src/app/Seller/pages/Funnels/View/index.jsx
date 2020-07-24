import React, {
  Fragment,
  useEffect,
  useContext,
  useCallback,
  useState
} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import {
  ColumnWrapper,
  ColumnLeft,
  ColumnRight,
  Container
} from 'templates/PageTemplate'
import ViewTable, { ViewTableRow, ViewTableCell } from 'components/ViewTable'
import { ToastContext } from 'components/ToastProvider'
import { userClientDeleteRequest } from 'seller/actions/userClients'
import {
  funnelsAsyncRequest,
  funnelAsyncRequest,
  funnelResetSelected,
  funnelDeleteRequest
} from 'seller/actions/funnels'
import UserInfo from 'components/UserInfo'
import Button from 'components/Button'
import { bindPathParams } from 'helpers'
import CreateGenericConfirmModal from 'components/GenericConfirmModal'
import { BaseUrl } from 'configs'
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell
} from 'components/Table'

import FunnelViewSidePanel from './SidePanel'
import { total } from '../List'

const Questions = [
  {
    code: 1,
    question: 'O quanto você gosta de moda?',
    answers: [
      { value: 1, label: 'Pouco' },
      { value: 2, label: 'Médio' },
      { value: 3, label: 'Muito' }
    ]
  },
  {
    code: 3,
    question: 'Escolha 5 cores de sua preferência?',
    answers: [
      { value: 1, label: 'Laranja' },
      { value: 2, label: 'Bordô' },
      { value: 3, label: 'Salmão' },
      { value: 4, label: 'Verde Musgo' },
      { value: 5, label: 'Azul Claro' },
      { value: 6, label: 'Azul Escuro' },
      { value: 7, label: 'Rosa Escuro' },
      { value: 8, label: 'Marrom' },
      { value: 9, label: 'Cinza' },
      { value: 10, label: 'Branco Brilhante' },
      { value: 12, label: 'Amarelo' },
      { value: 13, label: 'Branco' },
      { value: 14, label: 'Cinza' },
      { value: 15, label: 'Rosa Claro' },
      { value: 16, label: 'Preto' }
    ]
  },
  {
    code: 4,
    question: 'Você gosta de Corte V?',
    answers: [
      { value: 1, label: 'Não uso' },
      { value: 2, label: 'Talvez' },
      { value: 3, label: 'Sim, uso' }
    ]
  },
  {
    code: 5,
    question: 'Você gosta de Corte Canoa?',
    answers: [
      { value: 1, label: 'Não uso' },
      { value: 2, label: 'Talvez' },
      { value: 3, label: 'Sim, uso' }
    ]
  },
  {
    code: 6,
    question: 'Você gosta de Corte Boleiro?',
    answers: [
      { value: 1, label: 'Não uso' },
      { value: 2, label: 'Talvez' },
      { value: 3, label: 'Sim, uso' }
    ]
  },
  {
    code: 7,
    question:
      'Você prefere calça Super SLIM, peças mais justas nas pernas ou somente o corte Corte Class, peças mais soltas nas pernas?',
    answers: [
      { value: 1, label: 'Super Slim' },
      { value: 2, label: 'Class' },
      { value: 3, label: 'Ambas' }
    ]
  },
  {
    code: 8,
    question:
      'Escolha 3 modelos que você mais gostou, por ordem de preferência:',
    answers: [
      { value: 1, label: 'Opcão 1' },
      { value: 2, label: 'Opcão 2' },
      { value: 3, label: 'Opcão 3' },
      { value: 4, label: 'Opcão 4' },
      { value: 5, label: 'Opcão 5' },
      { value: 6, label: 'Opcão 6' },
      { value: 7, label: 'Opcão 7' },
      { value: 8, label: 'Opcão 8' },
      { value: 9, label: 'Opcão 9' }
    ]
  },
  {
    code: 9,
    question: 'Você gostaria de uma camiseta estampada com qual tema?',
    isCustom: true,
    labels: {
      theme: {
        label: 'Tema',
        options: [
          { value: 1, label: 'Música' },
          { value: 2, label: 'Oceano' },
          { value: 3, label: 'Caveiras' },
          { value: 4, label: 'Ídolos' },
          { value: 5, label: 'Poker' },
          { value: 6, label: 'Samurai' },
          { value: 7, label: 'Frases' },
          { value: 8, label: 'Animais' },
          { value: 9, label: 'Heróis' }
        ]
      },
      request: 'Pedido'
    }
  },
  {
    code: 10,
    question: 'Você usa Paletó?',
    answers: [
      { value: 1, label: 'Sim, Muito' },
      { value: 2, label: 'Não' },
      { value: 3, label: 'As vezes' }
    ]
  },
  {
    code: 11,
    question: 'Você usa Terno?',
    answers: [
      { value: 1, label: 'Sim, Muito' },
      { value: 2, label: 'Não' },
      { value: 3, label: 'As vezes' }
    ]
  },
  {
    code: 12,
    question:
      'Você usa com mais frequência camisetas ou camisas para sair em eventos, baladas, jantares, barzinhos, etc?',
    answers: [
      { value: 1, label: 'Camiseta' },
      { value: 2, label: 'Camisa' }
    ]
  },
  {
    code: 13,
    question: 'Você usa camisas de manga curta?',
    answers: [
      { value: 1, label: 'Sim' },
      { value: 2, label: 'Não' },
      { value: 3, label: 'Talvez' }
    ]
  },
  {
    code: 14,
    question: 'Usa GOLA POLO? AVIADOR é corte executivo de camisetas',
    answers: [
      { value: 1, label: 'Não uso' },
      { value: 2, label: 'Sim, gostaria' }
    ]
  },
  {
    code: 15,
    question: 'Você usaria a Camisa Premium, peça com leve brilho?',
    answers: [
      { value: 1, label: 'Sim' },
      { value: 2, label: 'Não' }
    ]
  },
  {
    code: 16,
    question: 'Você usa camisa com estampa?',
    answers: [
      { value: 1, label: 'Sim' },
      { value: 2, label: 'Não' }
    ]
  },
  {
    code: 17,
    question: 'Você usa camisa com tecidos trabalhados?',
    answers: [
      { value: 1, label: 'Sim' },
      { value: 2, label: 'Não' }
    ]
  },
  {
    code: 18,
    question:
      'Você usa ou usaria o estilo que as calças de alfaiataria oferecem?',
    answers: [
      { value: 1, label: 'Sim' },
      { value: 2, label: 'Não' }
    ]
  },
  {
    code: 19,
    question:
      'Quais produtos você tem maior necessidade no momento, escolha 3 por ordem de prioridade:',
    answers: [
      { value: 1, label: 'Opcão 1' },
      { value: 2, label: 'Opcão 2' },
      { value: 3, label: 'Opcão 3' },
      { value: 4, label: 'Opcão 4' },
      { value: 5, label: 'Opcão 5' },
      { value: 6, label: 'Opcão 6' },
      { value: 7, label: 'Opcão 7' },
      { value: 8, label: 'Opcão 8' },
      { value: 9, label: 'Opcão 9' }
    ]
  },
  {
    code: 20,
    question:
      'Qual sua profissão e seu estado civíl? Pergunto isso por eventuais campanhas de benefícios segmentados.',
    isCustom: true,
    labels: {
      civilState: {
        label: 'Estado Civíl',
        options: [
          { value: 1, label: 'Solteiro' },
          { value: 2, label: 'Noivo' },
          { value: 3, label: 'casado' }
        ]
      },
      profession: 'Profissão'
    }
  }
]

const ConfirmDeleteModal = CreateGenericConfirmModal({
  confirmBtnClassName: 'btn-danger',
  cancelOnClose: true
})

const FunnelsView = ({ profile: { pages } }) => {
  const { showSuccessToast, showErrorToast } = useContext(ToastContext)
  const [isDeleteModalOpen, toggleDeleteModal] = useState(false)
  const { funnelId } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const funnel = useSelector(({ seller }) =>
    seller.funnels.getIn(['options', 'selected'])
  )
  const funnels = useSelector(({ seller }) => seller.funnels.get('results'))
  const sellerId = useSelector((state) =>
    state.user.getIn(['data', 'seller', 'id'])
  )

  const funnelNotFound = () => {
    showErrorToast({
      message: 'Cadastro não encontrado!'
    })
    history.push(pages.FUNNELS.INDEX)
  }

  useEffect(() => {
    if (!funnelId) {
      funnelNotFound()
    } else {
      dispatch(funnelAsyncRequest(funnelId)).then((response) => {
        if (!response) {
          funnelNotFound()
        } else if (funnels.size === 0) {
          dispatch(funnelsAsyncRequest(sellerId))
        }
      })
    }

    return () => dispatch(funnelResetSelected())
  }, [funnelId, sellerId])

  const onDeleteConfirm = useCallback(async () => {
    toggleDeleteModal(false)
    const response = await dispatch(funnelDeleteRequest(funnel.get('id')))
    if (response) {
      await dispatch(userClientDeleteRequest(funnel.getIn(['userClient', 'id'])))
      showSuccessToast({
        message: 'Acesso removido com sucesso!'
      })
      await dispatch(funnelsAsyncRequest())
      history.push(pages.FUNNELS.INDEX)
    } else {
      showErrorToast({
        message: 'Ocorreu um problema, tente novamente mais tarde'
      })
    }
  }, [funnel, funnelId])

  const onDeleteClose = useCallback(() => {
    toggleDeleteModal(false)
  }, [])

  const onFunnelDeleteClick = useCallback(() => {
    toggleDeleteModal(true)
  }, [funnel])

  const onFunnelEditClick = useCallback(() => {
    const route = bindPathParams(
      {
        funnelId: funnel.get('id')
      },
      pages.FUNNELS.EDIT
    )
    history.push(route)
  }, [funnel])

  if (!funnel) {
    return null
  }

  const userClient = funnel.get('userClient')
  if (!userClient) {
    return null
  }

  const fullname = userClient.getFullName()
  const funnelAnswers = funnel.get('funnelAnswers')
  const hasAccess = funnelAnswers.size > 0
  const hasFinished = parseInt(funnel.get('currentQuestion'), 10) >= total
  const completed = (parseInt(funnel.get('currentQuestion'), 10) * 100) / total

  return (
    <Fragment>
      <FunnelViewSidePanel />
      <ColumnWrapper className='mb-2 mt-4'>
        <ColumnLeft>
          <div className='d-flex align-items-center h-100'>
            <div
              className={classNames(
                'px-3 py-1 text-white text-center rounded',
                {
                  'bg-danger': !hasAccess,
                  'bg-success': hasAccess
                }
              )}
            >
              {
                // eslint-disable-next-line no-nested-ternary
                hasAccess
                  ? !hasFinished
                    ? 'Em andamento'
                    : 'Finalizado'
                  : 'Pendente'
              }
            </div>
            {hasAccess && (
              <div
                className={classNames(
                  'ml-3 px-3 py-1 text-white text-center rounded bg-success',
                  {
                    'bg-danger': completed <= 49,
                    'bg-warning': completed <= 70,
                    'bg-success': completed === 100
                  }
                )}
              >
                {funnel.getFormatedPercent(completed)}
              </div>
            )}
          </div>
        </ColumnLeft>
        <ColumnRight isActionBar={true}>
          <Button
            type='button'
            className='btn btn-link'
            onClick={onFunnelDeleteClick}
          >
            Remover
          </Button>
          <Button
            type='button'
            className='btn btn-primary'
            onClick={onFunnelEditClick}
          >
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
            {`Email: ${userClient.get('email')}`}
          </UserInfo>
        </ColumnLeft>
      </ColumnWrapper>
      <Container isWhiteBackground={true}>
        <ViewTable title='Informações Pessoais'>
          <ViewTableRow>
            <ViewTableCell className='w-md-50' label='Nome' value={fullname} />
            <ViewTableCell
              className='w-md-25'
              label='E-mail'
              value={userClient.get('email')}
            />
            <ViewTableCell
              className='w-md-25'
              label='Sexo'
              value={userClient.getGenre()}
            />
          </ViewTableRow>
          <ViewTableRow>
            <ViewTableCell
              className='w-md-33'
              label='Celular'
              value={userClient.getFormatedPhone('phone')}
            />
            <ViewTableCell
              className='w-md-33'
              label='Cadastrado em'
              value={funnel.getFormatedDate('createdAt')}
            />
            <ViewTableCell
              className='w-md-33'
              label='Perguntas respondidas'
              value={`${funnel.get('currentQuestion')}/${total}`}
            />
          </ViewTableRow>
          <ViewTableRow>
            <ViewTableCell
              className='w-100'
              label='Link (Clique para copiar)'
              onClick={() =>
                navigator.clipboard
                  .writeText(`${BaseUrl}/${funnel.get('token')}`)
                  .then(() => {
                    showSuccessToast({
                      message: 'Link copiado para o clipboard!'
                    })
                  })
              }
              valueClassName='btn-link cursor-pointer'
              value={`${BaseUrl}/${funnel.get('token')}`}
            />
          </ViewTableRow>
        </ViewTable>
      </Container>
      <Container isWhiteBackground={true}>
        <Table className='min-width-lg-only mt-4 mt-lg-0'>
          <TableHead className='d-none d-lg-table-row'>
            <TableHeader>Pergunta</TableHeader>
            <TableHeader>Resposta</TableHeader>
          </TableHead>
          <TableBody>
            {Questions.map((q) => {
              const funnelAnswer = funnelAnswers.find((fa) => parseInt(fa.code, 10) === q.code)
              if (!funnelAnswer) {
                return null
              }

              const answer = JSON.parse(funnelAnswer.answer)
              if (!q.isCustom) {
                const { value } = answer
                if (Array.isArray(value)) {
                  const answerDesc = q.answers.filter((qa) => value.includes(qa.value))
                  return (
                    <TableRow key={q.code}>
                      <TableCell>{q.question}</TableCell>
                      <TableCell className='text-primary font-weight-bold'>{answerDesc.map((ad, i) => (i < answerDesc.length ? `${ad.label}, ` : `${ad.label}`))}</TableCell>
                    </TableRow>
                  )
                }

                const answerDesc = q.answers.find((qa) => qa.value === value)
                return (
                  <TableRow key={q.code}>
                    <TableCell>{q.question}</TableCell>
                    <TableCell className='text-primary font-weight-bold'>{answerDesc.label}</TableCell>
                  </TableRow>
                )
              }

              return null
            })}
          </TableBody>
        </Table>
      </Container>
      <ConfirmDeleteModal
        onConfirm={onDeleteConfirm}
        onCancel={onDeleteClose}
        isOpen={isDeleteModalOpen}
      >
        <span>
          Deseja remover <strong>{`${fullname}`}</strong>?
        </span>
      </ConfirmDeleteModal>
    </Fragment>
  )
}

FunnelsView.propTypes = {
  profile: PropTypes.object.isRequired
}

export default React.memo(FunnelsView)
