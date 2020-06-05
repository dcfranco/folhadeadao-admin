import { appLoadSpinner, appUnloadSpinner } from 'core/actions/app'

export const PASSWORD_RECOVERY_SUCCESS = 'PASSWORD_RECOVERY_SUCCESS'
export const PASSWORD_RECOVERY_ERROR = 'PASSWORD_RECOVERY_ERROR'

function passwordRecoverySuccess(payload) {
  return {
    type: PASSWORD_RECOVERY_SUCCESS,
    payload
  }
}

function passwordRecoveryError(errors) {
  return {
    type: PASSWORD_RECOVERY_ERROR,
    errors
  }
}

export function passwordRecoverySendToken(email) {
  return async (dispatch, state, services) => {
    dispatch(appLoadSpinner())

    try {
      const response = await services.apiV2({
        path: 'auth/forgot-password-token/',
        method: 'POST',
        body: {
          email_ou_cpf: email
        }
      })

      await dispatch(passwordRecoverySuccess(response))
      return response
    } catch (error) {
      dispatch(passwordRecoveryError(error))
      throw error
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}

export function passwordRecoveryVerifyToken(email, password, token) {
  return async (dispatch, state, services) => {
    dispatch(appLoadSpinner())

    try {
      const response = await services.apiV2({
        path: 'auth/forgot-password-change/',
        method: 'POST',
        body: {
          email_ou_cpf: email,
          password,
          token
        }
      })

      await dispatch(passwordRecoverySuccess(response))
      return response
    } catch (error) {
      dispatch(passwordRecoveryError(error))
      throw error
    } finally {
      dispatch(appUnloadSpinner())
    }
  }
}
