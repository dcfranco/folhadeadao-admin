import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import GridArea from 'components/GridArea'

const CardHeader = ({ children, className, alignSelf }) => {
  return (
    <GridArea
      name='title'
      alignSelf={alignSelf}
      className={classNames('mt-1', className)}
    >
      { children }
    </GridArea>
  )
}

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  alignSelf: PropTypes.string
}

CardHeader.defaultProps = {
  className: '',
  alignSelf: 'start'
}

export default CardHeader
