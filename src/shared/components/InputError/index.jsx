import React, { Fragment } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const InputError = (props) => {
  const { touched, error, className } = props
  return touched && error && error.length > 0 ? (
    <Fragment>
      <small className={classNames('text-danger form-text', className)}>{error}</small>
      <div className='mb-1' />
    </Fragment>
  ) : null
}

InputError.propTypes = {
  touched: PropTypes.any,
  error: PropTypes.any,
  className: PropTypes.string
}

InputError.defaultProps = {
  className: '',
  error: null,
  touched: false
}

export default InputError
