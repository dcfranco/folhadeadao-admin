import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'templates/PageTemplate'

const Sellers = ({ children }) => {
  return (
    <Layout>
      { children }
    </Layout>
  )
}

Sellers.propTypes = {
  children: PropTypes.node.isRequired
}

export default React.memo(Sellers)
