import React from 'react'
import PropTypes from 'prop-types'
import ModuleTemplate from 'templates/ModuleTemplate'

const { Layout } = ModuleTemplate

const SellerContainer = ({ children }) => {
  return (
    <Layout>
      { children }
    </Layout>
  )
}

SellerContainer.propTypes = {
  children: PropTypes.node.isRequired
}

export default React.memo(SellerContainer)
