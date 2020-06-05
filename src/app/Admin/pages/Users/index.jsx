import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'templates/PageTemplate'

const Users = ({ children }) => {
  return (
    <Layout>
      { children }
    </Layout>
  )
}

Users.propTypes = {
  children: PropTypes.node.isRequired
}

export default React.memo(Users)
