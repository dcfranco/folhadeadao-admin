// @flow
import LazyLoading from 'components/LazyLoading'
import { HomeOutlined } from '@material-ui/icons'

// Pages
const DashboardPage = LazyLoading(() => import('seller/pages/Dashboard'))

const FunnelPage = LazyLoading(() => import('seller/pages/Funnels'))
const FunnelListPage = LazyLoading(() => import('seller/pages/Funnels/List'))
const FunnelFormPage = LazyLoading(() => import('seller/pages/Funnels/Form'))

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
      NEW: {
        route: '/new',
        name: 'Novo',
        component: FunnelFormPage,
        hideMenu: true
      }
    }
  }
}

export type TSellerRoutes = typeof SellerRoutes

export default SellerRoutes
