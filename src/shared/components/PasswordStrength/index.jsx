import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const PasswordStrength = ({ score, children }) => {
  const [value, className, message] = score
  return (
    <div className='row'>
      <div className='col-12'>
        <div className='form-group'>
          <div className='progress rounded password-strength'>
            { value ? (
              <div
                className={classNames(`progress-bar border-${className} bg-${className}`, {
                  [`text-${className}`]: value === 0
                })}
                role='progressbar'
                aria-valuenow={value}
                aria-valuemin='0'
                aria-valuemax='100'
                style={{ width: `${value}%` }}
              >
                { message }
              </div>
            ) : (
              <div className='w-100 text-center children'>
                { children }
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

PasswordStrength.propTypes = {
  children: PropTypes.node.isRequired,
  score: PropTypes.array.isRequired
}

export default PasswordStrength
