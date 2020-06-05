import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
// import { useActiveRoute } from 'hooks'

const Layout = ({ children, className, isFluid }) => {
  return (
    <div className={classNames('mb-5', className, {
      'container-fluid': isFluid,
      'container': !isFluid
    })}
    >
      { children }
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isFluid: PropTypes.bool
}

Layout.defaultProps = {
  className: '',
  isFluid: true
}

export { default as Container } from './Container'
export { default as ColumnWrapper } from './ColumnWrapper'
export { default as ColumnRight } from './ColumnRight'
export { default as ColumnLeft } from './ColumnLeft'
export { default as Title } from './Title'
export { default as BackLink } from './BackLink'
export { default as HeaderInfo } from './HeaderInfo'
export { default as Box } from './Box'

export default React.memo(Layout)
