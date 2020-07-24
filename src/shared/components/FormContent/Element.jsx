import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const FormContentElement = ({ children, className, sm, lg, xl, xxl }) => {
  return (
    <div
      className={classNames({
        [`col-md-${lg}`]: lg !== '',
        [`col-xl-${xl}`]: xl !== '',
        [`col-2xl-${xxl}`]: xxl !== '',
        [`col-${sm}`]: sm !== ''
      }, className)}
    >
      { children }
    </div>
  )
}

FormContentElement.propTypes = {
  children: PropTypes.node.isRequired,
  lg: PropTypes.string,
  sm: PropTypes.string,
  xl: PropTypes.string,
  xxl: PropTypes.string,
  className: PropTypes.string
}

FormContentElement.defaultProps = {
  sm: '12',
  lg: '',
  xl: '',
  xxl: '',
  className: ''
}

export default React.memo(FormContentElement)
