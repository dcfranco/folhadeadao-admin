import React, { useState } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Uncollapsed from './Uncollapsed'
import Collapsed from './Collapsed'

export { Uncollapsed, Collapsed }

const CollapsedRow = ({ className, children }) => {
  const [isEditable, setEditable] = useState(false)

  const uncollapsed = children instanceof Array && children.find((obj, i) => i === 0)
  const collapsed = children instanceof Array && children.find((obj, i) => i === 1)

  return (
    <div className={classNames('collapsed-row', className, {
      'collapsed': isEditable
    })}
    >
      { !isEditable && uncollapsed && React.cloneElement(uncollapsed, {
        onClick: () => setEditable(true)
      })}
      { isEditable && collapsed && React.cloneElement(collapsed, {
        onClick: () => setEditable(false)
      })}
    </div>
  )
}

CollapsedRow.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

CollapsedRow.defaultProps = {
  className: ''
}

export default CollapsedRow
