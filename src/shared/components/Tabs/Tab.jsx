import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

@connect((state) => ({
  invalidIds: state.errors.get('invalidIds')
}))
export default class Tab extends Component {
  static propTypes = {
    tabName: PropTypes.string.isRequired,
    className: PropTypes.string,
    tabKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    invalidIds: PropTypes.object.isRequired,
    isActive: PropTypes.bool,
    isInvalid: PropTypes.bool,
    onTabChange: PropTypes.func
  }

  static defaultProps = {
    onTabChange: null,
    isActive: false,
    isInvalid: false,
    className: ''
  }

  render() {
    const { tabName, tabKey, onTabChange, isActive, isInvalid, className, invalidIds } = this.props
    return (
      <li className='nav-item' key={tabKey}>
        { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
        <a
          className={classNames('nav-link', className, {
            'active': isActive,
            'text-danger': isInvalid || invalidIds.includes(tabKey)
          })}
          onClick={() => onTabChange(tabKey)}
        >
          <span>{ tabName }</span>
        </a>
      </li>
    )
  }
}
