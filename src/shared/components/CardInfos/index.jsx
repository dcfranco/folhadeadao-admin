import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import GridArea from 'components/GridArea'
import GridLayout from 'components/GridLayout'

const CardInfos = ({ children, className }) => {
  const infosTemplate = children && children.length > 1 ? 'repeat(2, 1fr)' : 'repeat(1, 1fr)'
  return (
    <GridArea
      name='infos'
      alignSelf='center'
      className={classNames('card-infos', className)}
    >
      <GridLayout
        gridTemplateColumns={infosTemplate}
      >
        { children }
      </GridLayout>
    </GridArea>
  )
}

CardInfos.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

CardInfos.defaultProps = {
  className: ''
}

export default CardInfos
