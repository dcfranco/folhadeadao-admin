// @flow

import LazyLoading from 'components/LazyLoading'
import { HomeOutlined, SupervisorAccount, PermContactCalendar, FilterList } from '@material-ui/icons'

// Pages
const DashboardPage = LazyLoading(() => import('admin/pages/Dashboard'))

const SellersPage = LazyLoading(() => import('admin/pages/Sellers'))
const SellersListPage = LazyLoading(() => import('admin/pages/Sellers/List'))
const SellersViewPage = LazyLoading(() => import('admin/pages/Sellers/View'))
const SellersFormPage = LazyLoading(() => import('admin/pages/Sellers/Form'))

const UsersPage = LazyLoading(() => import('admin/pages/Users'))
const UsersListPage = LazyLoading(() => import('admin/pages/Users/List'))
const UsersViewPage = LazyLoading(() => import('admin/pages/Users/View'))
const UsersFormPage = LazyLoading(() => import('admin/pages/Users/Form'))

const SalesFunnelPage = LazyLoading(() => import('admin/pages/SalesFunnel'))
const SalesFunnelListPage = LazyLoading(() => import('admin/pages/SalesFunnel/List'))
const SalesFunnelQuestionPage = LazyLoading(() => import('admin/pages/SalesFunnel/Question'))
const SalesFunnelQuestionDetailsPage = LazyLoading(() => import('admin/pages/SalesFunnel/Question/Details'))
const SalesFunnelQuestionFormPage = LazyLoading(() => import('admin/pages/SalesFunnel/Question/Form'))
const SalesFunnelQuestionViewPage = LazyLoading(() => import('admin/pages/SalesFunnel/Question/View'))
const SalesFunnelQuestionDomainsPage = LazyLoading(() => import('admin/pages/SalesFunnel/Question/Domains'))

const AdminRoutes = {
  INDEX: {
    route: '',
    name: 'Dashboard',
    component: DashboardPage,
    icon: () => HomeOutlined
  },
  SELLERS: {
    route: '/sellers',
    name: 'Representantes',
    component: SellersPage,
    icon: () => SupervisorAccount,
    routes: {
      INDEX: {
        route: '',
        name: 'Lista',
        component: SellersListPage
      },
      VIEW: {
        route: '/view/:sellerId',
        name: 'Detalhes',
        component: SellersViewPage,
        hideMenu: true
      },
      NEW: {
        route: '/new',
        name: 'Novo',
        component: SellersFormPage,
        hideMenu: true
      },
      EDIT: {
        route: '/edit/:sellerId',
        name: 'Editar',
        component: SellersFormPage,
        hideMenu: true
      }
    }
  },
  USERS: {
    route: '/users',
    name: 'Usuários',
    component: UsersPage,
    icon: () => PermContactCalendar,
    routes: {
      INDEX: {
        route: '',
        name: 'Lista',
        component: UsersListPage
      },
      VIEW: {
        route: '/view/:userId',
        name: 'Detalhes',
        component: UsersViewPage,
        hideMenu: true
      },
      NEW: {
        route: '/new',
        name: 'Novo',
        component: UsersFormPage,
        hideMenu: true
      },
      EDIT: {
        route: '/edit/:userId',
        name: 'Editar',
        component: UsersFormPage,
        hideMenu: true
      }
    }
  },
  FUNNELS: {
    route: '/sales-funnel',
    name: 'Funil de Vendas',
    component: SalesFunnelPage,
    icon: () => FilterList,
    routes: {
      INDEX: {
        route: '',
        name: 'Lista',
        component: SalesFunnelListPage
      },
      QUESTION: {
        route: '/:funnelId',
        name: 'Gestão de Perguntas',
        component: SalesFunnelQuestionPage,
        hideMenu: true,
        routes: {
          INDEX: {
            route: '',
            name: 'Detalhes sobre o funíl',
            component: SalesFunnelQuestionDetailsPage
          },
          VIEW: {
            route: '/view/:questionId',
            name: 'Visualizar pergunta',
            component: SalesFunnelQuestionViewPage,
            hideMenu: true
          },
          EDIT: {
            route: '/edit/:questionId',
            name: 'Editar pergunta',
            component: SalesFunnelQuestionFormPage,
            hideMenu: true
          },
          NEW: {
            route: '/new',
            name: 'Criar nova pergunta',
            component: SalesFunnelQuestionFormPage,
            hideMenu: true
          },
          EDIT_DOMAIN: {
            route: '/:questionId/domain/edit/:domainId',
            name: 'Editar resposta',
            component: SalesFunnelQuestionDomainsPage,
            hideMenu: true
          },
          NEW_DOMAIN: {
            route: '/:questionId/domain/new',
            name: 'Criar nova resposta',
            component: SalesFunnelQuestionDomainsPage,
            hideMenu: true
          }
        }
      }
    }
  }
}

export type TAdminRoutes = typeof AdminRoutes

export default AdminRoutes
