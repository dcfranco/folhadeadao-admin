import React, { useRef, useCallback } from 'react'
import { Field } from 'redux-form/immutable'
import { range, get, trim } from 'lodash'
import PropTypes from 'prop-types'
import { toUpperCase } from 'form/normalizers'
import classNames from 'classnames'

import ReduxFormInput from 'components/ReduxFormInput'

export const TOKEN_SIZE = 6

export function Token({ tokenErrors, className, iClassName }) {
  const inputTokenRefs = range(TOKEN_SIZE).map(() => useRef())

  const onChangeInput = useCallback((index, event) => {
    const { value } = event && event.currentTarget

    if (!value) return null
    if (index === TOKEN_SIZE - 1) {
      inputTokenRefs[index].current.getRenderedComponent().blur()
      return null
    }
    return get(inputTokenRefs[index + 1], 'current.getRenderedComponent')
      && inputTokenRefs[index + 1].current.getRenderedComponent().focus()
  }, [inputTokenRefs])

  const onKeyDown = useCallback((index, event) => {
    if (index === 0 || event.currentTarget.value) {
      return null
    }

    if (event.key && event.key !== 'Backspace') {
      return null
    }

    const input = inputTokenRefs[index - 1].current.getRenderedComponent()
    input.focus()
    return input.value = ''
  }, [inputTokenRefs])

  const handleTokenPaste = (event) => {
    const token = trim(event.clipboardData.getData('text')).substring(0, TOKEN_SIZE)

    event.preventDefault()
    event.stopPropagation()

    if (token.length > TOKEN_SIZE) {
      return null
    }

    const chars = token.split('')
    return range(0, token.length).forEach(current => {
      inputTokenRefs[current].current.getRenderedComponent().value = chars.shift()
      if (current === TOKEN_SIZE - 1) {
        inputTokenRefs[current].current.getRenderedComponent().blur()
        return null
      }

      return inputTokenRefs[current + 1].current.getRenderedComponent().focus()
    })
  }

  return (
    <div
      className={classNames('bg-light border border-low-dark mt-4 border-dotted', className)}
    >
      <div className='d-flex flex-column px-1 px-md-5 mx-1 mx-md-5'>
        <div className='d-flex align-items-center justify-content-center'>
          {
            range(TOKEN_SIZE).map((index) => {
              return (
                <Field
                  type='text'
                  name={`token[${index}]`}
                  id={`token[${index}]`}
                  formClassName={iClassName}
                  className='text-center rounded-0 p-0'
                  ref={inputTokenRefs[index]}
                  onChange={(event) => onChangeInput(index, event)}
                  onKeyDown={(event) => onKeyDown(index, event)}
                  onPaste={handleTokenPaste}
                  component={ReduxFormInput}
                  normalize={toUpperCase}
                  maxLength={1}
                  errorText={!!tokenErrors}
                  key={index}
                  hideError={true}
                  forwardRef={true}
                />
              )
            })
          }
        </div>
        { tokenErrors && (
          <span className='d-block text-center text-danger'>
            { tokenErrors }
          </span>
        ) }
      </div>
    </div>
  )
}

Token.propTypes = {
  tokenErrors: PropTypes.string,
  className: PropTypes.string,
  iClassName: PropTypes.string
}

Token.defaultProps = {
  tokenErrors: null,
  className: 'px-3 px-sm-5 pt-4 pb-3',
  iClassName: 'px-2'
}

export default Token
