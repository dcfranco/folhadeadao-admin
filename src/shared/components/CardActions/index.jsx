import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import GridArea from 'components/GridArea'

const CardActions = ({ children, className }) => {
  return (
    <GridArea
      name='actions'
      className={classNames('card-actions', className)}
      justifySelf='flex-end'
    >
      { children }
    </GridArea>
  )
}

CardActions.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

CardActions.defaultProps = {
  className: ''
}

export default CardActions
