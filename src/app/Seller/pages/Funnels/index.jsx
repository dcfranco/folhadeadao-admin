import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'templates/PageTemplate'

const Funnels = ({ children }) => {
  return (
    <Layout>
      { children }
    </Layout>
  )
}

Funnels.propTypes = {
  children: PropTypes.node.isRequired
}

export default React.memo(Funnels)
