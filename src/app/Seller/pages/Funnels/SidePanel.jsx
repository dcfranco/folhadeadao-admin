import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import SidePanelTemplate from 'templates/SidePanelTemplate'
import SidePanelRender from 'components/SidePanelRender'

const { Layout, Header, Title, Links, Link, Action } = SidePanelTemplate

const FunnelsSidePanel = ({ pages, routes, onChange }) => {
  const history = useHistory()

  return (
    <SidePanelRender>
      <Layout>
        <Header>
          <Title>
            Funís de Venda
          </Title>
          <Action onClick={() => history.push(pages.NEW)}>
            +
          </Action>
        </Header>
        <Links>
          { Object.keys(routes).map((key) => {
            if (routes[key].hideMenu) {
              return null
            }

            return (
              <Link
                pages={pages}
                routeKey={key}
                key={key}
                onClick={onChange}
              >
                { routes[key].name }
              </Link>
            )
          })}
        </Links>
      </Layout>
    </SidePanelRender>
  )
}

FunnelsSidePanel.propTypes = {
  routes: PropTypes.object.isRequired,
  pages: PropTypes.object.isRequired,
  onChange: PropTypes.func
}

FunnelsSidePanel.defaultProps = {
  onChange: undefined
}

export default React.memo(FunnelsSidePanel)
