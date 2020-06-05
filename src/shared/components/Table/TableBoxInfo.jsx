import React, { Fragment, memo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export const TableBoxInfo = memo(({ title, children, className, valueClassName }) => {
  return (
    <Fragment>
      <span className={classNames('d-block', className)}>
        { title }
      </span>
      <span className={valueClassName}>
        { children }
      </span>
    </Fragment>
  )
})

TableBoxInfo.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  valueClassName: PropTypes.string,
  title: PropTypes.string.isRequired
}

TableBoxInfo.defaultProps = {
  children: null,
  className: '',
  valueClassName: 'd-block small text-low-dark mt-n1'
}
