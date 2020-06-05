import React, { forwardRef, memo } from 'react'
import PropTypes from 'prop-types'
import { FormSection } from 'redux-form/immutable'

const FormContent = memo(forwardRef(({ title, children, name }, ref) => {
  return (
    <FormSection name={name}>
      <div className='mb-3' ref={ref}>
        { title && (<h5 className='text-primary '>{ title }</h5>) }
        { children }
      </div>
    </FormSection>
  )
}))

FormContent.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  name: PropTypes.string
}

FormContent.defaultProps = {
  name: '',
  title: null
}

export { default as Row } from './Row'
export { default as Element } from './Element'
export { default as FormArea } from './Area'

export default FormContent
