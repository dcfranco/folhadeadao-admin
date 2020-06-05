import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const Account = ({ children }) => {
  return (
    <Fragment>
      { children }
    </Fragment>
  )
}

Account.propTypes = {
  children: PropTypes.node.isRequired
}

export default Account
