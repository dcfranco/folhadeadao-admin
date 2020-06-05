import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { removeEmptyKeys } from 'helpers'

const GridLayout = ({
  children, className, gridTemplate, gridTemplateColumns, gridGap, justifyContent, alignContent
}) => {
  const gridStyles = removeEmptyKeys({
    gridTemplate,
    gridTemplateColumns,
    gridGap,
    justifyContent,
    alignContent
  })

  return (
    <div
      className={classNames('d-grid', className)}
      style={gridStyles}
    >
      { children }
    </div>
  )
}

GridLayout.propTypes = {
  children: PropTypes.node.isRequired,
  gridTemplate: PropTypes.string,
  gridTemplateColumns: PropTypes.string,
  className: PropTypes.string,
  gridGap: PropTypes.string,
  justifyContent: PropTypes.string,
  alignContent: PropTypes.string
}

GridLayout.defaultProps = {
  className: '',
  gridTemplate: '',
  gridTemplateColumns: '',
  gridGap: '1rem',
  justifyContent: 'start',
  alignContent: 'start'
}

export default GridLayout
