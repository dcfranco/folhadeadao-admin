import React, { memo, Fragment } from 'react'
import PropTypes from 'prop-types'

const DefaultFormatter = ({ value }) => {
  return (
    <Fragment>
      { value }
    </Fragment>
  )
}

DefaultFormatter.propTypes = {
  value: PropTypes.any
}

DefaultFormatter.defaultProps = {
  value: 0
}

export default memo(DefaultFormatter)
