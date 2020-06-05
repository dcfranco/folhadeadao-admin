import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Edit } from '@material-ui/icons'
import Button from 'components/Button'
import { Container } from 'templates/PageTemplate'

const VerifiedArea = ({ isVerified, label, children, onValidate, onEdit, hideStatus }) => {
  return (
    <Container isWhiteBackground={true} className='py-3 px-4 mb-3'>
      <div className='d-flex justify-content-between align-items-center'>
        <div>
          <span className={classNames('d-block font-weight-bold', {
            'text-danger': !isVerified
          })
          }
          >
            { `${label}: ` }
          </span>
          <span className='d-block'>{ children }</span>
          { !hideStatus && (
            <span className={classNames('d-block', {
              'text-danger': !isVerified,
              'text-success': isVerified
            })}
            >
              { isVerified ? `${label} foi validado.` : `${label} não validado.` }
            </span>
          ) }
        </div>
        { !isVerified ? (
          <div>
            <Button className='btn btn-danger' onClick={onValidate}>Validar</Button>
          </div>
        ) : (
          <div className='border border-gray rounded p-2' onClick={onEdit}>
            <Edit className='svg-action' />
          </div>
        ) }
      </div>
    </Container>
  )
}

VerifiedArea.propTypes = {
  children: PropTypes.node.isRequired,
  isVerified: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onValidate: PropTypes.func,
  hideStatus: PropTypes.bool
}

VerifiedArea.defaultProps = {
  hideStatus: false,
  onValidate: () => {}
}

export default VerifiedArea
