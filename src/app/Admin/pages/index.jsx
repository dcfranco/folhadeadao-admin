import React from 'react'
import PropTypes from 'prop-types'
import ModuleTemplate from 'templates/ModuleTemplate'

const { Layout } = ModuleTemplate

const AdminContainer = ({ children }) => {
  return (
    <Layout>
      { children }
    </Layout>
  )
}

AdminContainer.propTypes = {
  children: PropTypes.node.isRequired
}

export default React.memo(AdminContainer)
