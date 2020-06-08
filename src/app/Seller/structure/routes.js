// @flow
import LazyLoading from 'components/LazyLoading'
import { HomeOutlined } from '@material-ui/icons'

// Pages
const DashboardPage = LazyLoading(() => import('seller/pages/Dashboard'))

const FunnelPage = LazyLoading(() => import('seller/pages/Funnels'))
const FunnelListPage = LazyLoading(() => import('seller/pages/Funnels/List'))
const FunnelFormPage = LazyLoading(() => import('seller/pages/Funnels/Form'))
const FunnelViewPage = LazyLoading(() => import('seller/pages/Funnels/View'))

const SellerRoutes = {
  INDEX: {
    route: '',
    name: 'Dashboard',
    component: DashboardPage,
    icon: () => HomeOutlined
  },
  FUNNELS: {
    route: '/funnel',
    name: 'Funíl de Venda',
    component: FunnelPage,
    icon: () => HomeOutlined,
    routes: {
      INDEX: {
        route: '',
        name: 'Lista',
        component: FunnelListPage
      },
      VIEW: {
        route: '/view/:funnelId',
        name: 'Detalhes',
        component: FunnelViewPage,
        hideMenu: true
      },
      NEW: {
        route: '/new',
        name: 'Novo',
        component: FunnelFormPage,
        hideMenu: true
      },
      EDIT: {
        route: '/edit/:funnelId',
        name: 'Editar',
        component: FunnelFormPage,
        hideMenu: true
      }
    }
  }
}

export type TSellerRoutes = typeof SellerRoutes

export default SellerRoutes
