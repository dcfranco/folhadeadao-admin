import React, { Fragment, useEffect, useContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { salesFunnelAsyncRequest } from 'admin/actions/sales-funnel'
import { questionResetSelected } from 'admin/actions/questions'
import { domainTypesAsyncRequest } from 'admin/actions/domain-types'
import { ToastContext } from 'components/ToastProvider'

const SalesFunnelManagement = ({ children, profile: { pages } }) => {
  const { showErrorToast } = useContext(ToastContext)
  const { funnelId } = useParams()
  const funnel = useSelector(({ admin }) => admin.salesFunnel.getIn(['options', 'selected']))
  const history = useHistory()
  const dispatch = useDispatch()

  const funnelNotFound = useCallback(() => {
    showErrorToast({
      message: 'Funil não encontrado!'
    })
    history.push(pages.FUNNELS.INDEX)
  }, [])

  useEffect(() => {
    dispatch(questionResetSelected())
    dispatch(domainTypesAsyncRequest())
  }, [])

  useEffect(() => {
    if (funnelId && !funnel) {
      dispatch(salesFunnelAsyncRequest(funnelId)).then((response) => {
        if (!response) {
          funnelNotFound()
        }
      })
    }
  }, [funnelId])

  if (!funnel) {
    return null
  }

  return (
    <Fragment>
      { children }
    </Fragment>
  )
}

SalesFunnelManagement.propTypes = {
  children: PropTypes.node.isRequired,
  profile: PropTypes.object.isRequired
}

export default SalesFunnelManagement
