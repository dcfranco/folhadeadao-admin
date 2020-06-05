import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { hasSubmitFailed, getFormInvalidIds } from 'redux-form/immutable'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Tab from './Tab'

export { Tab }

export function Tabs(props) {
  const { children, activeKey, onTabChange, mountAllTabsOnRender,
    validateFromForm, className } = props
  const submitFailed = useSelector(state => hasSubmitFailed(validateFromForm)(state))
  const invalidIds = useSelector(state => getFormInvalidIds(validateFromForm)(state))

  function renderTabMenu() {
    if (Array.isArray(children)) {
      return React.Children.map(children, (child) => {
        if (child === null) {
          return null
        }
        const { tabKey } = child.props
        return React.cloneElement(child, {
          onTabChange,
          isActive: activeKey === child.props.tabKey,
          isInvalid: (invalidIds.get(tabKey) && submitFailed)
        })
      })
    }

    return React.cloneElement(children, {
      onClick: onTabChange,
      isActive: activeKey === children.props.tabKey
    })
  }

  function renderAllTabContents() {
    try {
      if (Array.isArray(children)) {
        return children.map((child) => {
          if (!child) {
            return null
          }

          const isVisible = child.props.tabKey === activeKey
          return (
            <div
              key={child.props.tabKey}
              className={classNames('d-none', {
                'd-block': isVisible
              })}
            >
              { child.props.children }
            </div>
          )
        })
      }

      return children.props.children
    } catch (error) {
      throw new Error(`Unable to find tabKey content by activeKey ${activeKey}. Check your props`)
    }
  }

  function renderTabContent() {
    try {
      if (Array.isArray(children)) {
        const contentElement = children.find((child) => {
          if (!child) {
            return null
          }
          return child.props.tabKey === activeKey
        })

        if (!contentElement) {
          return null
        }

        return contentElement.props.children
      }

      if (!children) {
        return null
      }

      return children.props.children
    } catch (error) {
      throw new Error(`Unable to find tabKey content by activeKey ${activeKey}. Check your props`)
    }
  }

  return (
    <Fragment>
      <div className='nav-tabs-container'>
        <ul className='nav nav-tabs'>
          { renderTabMenu() }
        </ul>
      </div>
      <div className={classNames('p-md-3 overflow-hidden', className)}>
        { !mountAllTabsOnRender ? renderTabContent() : renderAllTabContents() }
      </div>
    </Fragment>
  )
}

Tabs.propTypes = {
  activeKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  onTabChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  mountAllTabsOnRender: PropTypes.bool,
  validateFromForm: PropTypes.string,
  className: PropTypes.string
}

Tabs.defaultProps = {
  mountAllTabsOnRender: false,
  validateFromForm: '',
  className: ''
}

export default Tabs
