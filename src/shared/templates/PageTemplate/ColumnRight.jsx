import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ActionBarRender from 'components/ActionBarRender'
import { useWindowSize } from 'hooks'

const ColumnRight = ({ children, className, isActionBar }) => {
  const size = useWindowSize()

  if (isActionBar && ['XS', 'SM'].includes(size)) {
    return (
      <ActionBarRender>
        <div className='mobile-action-bar'>
          { children }
        </div>
      </ActionBarRender>
    )
  }

  return (
    <div
      className={classNames('ml-auto', className)}
    >
      { children }
    </div>
  )
}

ColumnRight.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isActionBar: PropTypes.bool
}

ColumnRight.defaultProps = {
  className: '',
  isActionBar: false
}

export default React.memo(ColumnRight)
