import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { ArrowBack } from '@material-ui/icons'
import Button from 'components/Button'

const BackLink = ({ children, onClick, className }) => {
  return (
    <Button
      onClick={onClick}
      className={classNames('btn btn-link back-button', className)}
    >
      <ArrowBack className='font-size-sm' />
      <span className='ml-1'>
        { children }
      </span>
    </Button>
  )
}

BackLink.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string
}


BackLink.defaultProps = {
  className: ''
}

export default React.memo(BackLink)
