import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'templates/PageTemplate'

const SalesFunnel = ({ children }) => {
  return (
    <Layout>
      { children }
    </Layout>
  )
}

SalesFunnel.propTypes = {
  children: PropTypes.node.isRequired
}

export default React.memo(SalesFunnel)
