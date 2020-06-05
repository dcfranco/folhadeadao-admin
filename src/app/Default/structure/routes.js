// @flow
import {
  AUTH_REQUIRED,
  NOAUTH_REQUIRED,
  AUTO_SELECT_PROFILE
} from 'constants/permission'
import LazyLoading from 'components/LazyLoading'

// Pages
const LoginPage = LazyLoading(() => import('default/pages/Login'))
const ProfilesPage = LazyLoading(() => import('default/pages/Profiles'))

const RegistrationPage = LazyLoading(() => import('default/pages/Registration'))
const RegistrationMenuPage = LazyLoading(() =>
  import('default/pages/Registration/Menu')
)
const RegistrationRegisterPage = LazyLoading(() =>
  import('default/pages/Registration/Register')
)
const RegistrationFeedbackPage = LazyLoading(() =>
  import('default/pages/Registration/Feedback')
)

const ResetPasswordPage = LazyLoading(() =>
  import('default/pages/ResetPassword')
)
const ResetPasswordFormPage = LazyLoading(() =>
  import('default/pages/ResetPassword/Form')
)
const ResetPasswordTokenPage = LazyLoading(() =>
  import('default/pages/ResetPassword/Token')
)
const ResetPasswordPasswordPage = LazyLoading(() =>
  import('default/pages/ResetPassword/Password')
)

export const DefaultRoutes = {
  LOGIN: {
    route: '/login',
    name: 'Login',
    component: LoginPage,
    permissions: [NOAUTH_REQUIRED]
  },
  PROFILES: {
    route: '/profiles',
    name: 'Perfil',
    component: ProfilesPage,
    permissions: [AUTH_REQUIRED, AUTO_SELECT_PROFILE]
  },
  REGISTRATION: {
    route: '/registration',
    name: 'Quero me cadastrar',
    component: RegistrationPage,
    permissions: [NOAUTH_REQUIRED],
    routes: {
      INDEX: {
        route: '',
        name: 'Quero me Cadastrar',
        component: RegistrationMenuPage
      },
      REGISTER: {
        route: '/register',
        name: 'Cadastro de Conta',
        component: RegistrationRegisterPage
      },
      SUCCESS: {
        route: '/success',
        name: 'Cadastrado com Sucesso',
        component: RegistrationFeedbackPage,
        isFeedback: true
      }
    }
  },
  RESET_PASSWORD: {
    route: '/reset-password',
    name: 'Recuperar Senha',
    component: ResetPasswordPage,
    permissions: [NOAUTH_REQUIRED],
    routes: {
      INDEX: {
        route: '',
        name: '',
        component: ResetPasswordFormPage
      },
      TOKEN: {
        route: '/token',
        name: 'Token',
        component: ResetPasswordTokenPage,
        isFeedback: true
      },
      PASSWORD: {
        route: '/password',
        name: 'Nova Senha',
        component: ResetPasswordPasswordPage
      }
    }
  }
}
export type TDefaultRoutes = typeof DefaultRoutes

export default DefaultRoutes
