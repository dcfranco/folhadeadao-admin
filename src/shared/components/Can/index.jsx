import React, { Component } from 'react' // eslint-disable-line
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export function hasPermission(permissionToTest, allPermissions) {
  return !!allPermissions.find(p => p === permissionToTest)
}

export const PERMISSIONS = {
  // menus
  CONT_IOF_GET: 'CONT_IOF_GET',
  CONT_LANCAMENTOS_GET: 'CONT_LANCAMENTOS_GET',
  CONT_EVENTOS_DETALHES_GET: 'CONT_EVENTOS_DETALHES_GET',
  CONT_FLUXO_DE_CAIXA_GET: 'CONT_FLUXO_DE_CAIXA_GET',
  CRED_CONTAS_A_PAGAR_GET: 'CRED_CONTAS_A_PAGAR_GET',
  CONT_RELATORIOS_GET: 'CONT_RELATORIOS_GET',
  CONT_RATING_GET: 'CONT_RATING_GET',
  CONT_RATING_EDIT: 'CONT_RATING_EDIT'
}

@connect(state => ({
  user: state.user.get('data')
}))
export default class Can extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    // this is interpretted in OR fashion when it's an array (not AND'd together)
    I: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ]).isRequired,
    children: PropTypes.node,
    unauthorizedRender: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object
    ])
  }

  static defaultProps = {
    unauthorizedRender: null,
    children: null
  }

  render() {
    const { I, user, children, unauthorizedRender } = this.props

    const modality = user.getSelectedModality()
    const permissions = modality.get('permissions')
    const userHasPermission = Array.isArray(I)
      ? !!I.find(i => !!permissions.find(p => p === i))
      : !!permissions.find(p => p === I)
    if (userHasPermission) {
      return children
    }

    return unauthorizedRender instanceof Function ? unauthorizedRender() : unauthorizedRender
  }
}
