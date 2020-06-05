import React from 'react'
import PropTypes from 'prop-types'

export const GridArea = ({
  children, className, name, alignSelf, justifySelf
}) => {
  return (
    <div
      className={className}
      style={{ gridArea: name, alignSelf, justifySelf }}
    >
      { children }
    </div>
  )
}

GridArea.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  alignSelf: PropTypes.string,
  justifySelf: PropTypes.string
}

GridArea.defaultProps = {
  className: '',
  alignSelf: '',
  justifySelf: ''
}

export default GridArea
