import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import FeedbackHeader from './Header'
import FeedbackContent from './Content'
import FeedbackLinks from './Links'
import FeedbackLink from './Link'
import FeedbackLeft from './Left'
import FeedbackRight from './Right'
import FeedbackTitle from './Title'

const Layout = ({ children, isHorizontal }) => {
  useEffect(() => {
    document.body.style.backgroundColor = '#f0f1f4'
  }, [])
  return (
    <div className='container feedback'>
      <div className='row h-100 justify-content-md-center align-items-md-center mt-md-n5'>
        <div
          className={classNames('p-0 p-md-5', {
            'col-12 col-lg-9': !isHorizontal,
            'col-12': isHorizontal
          })}
        >
          <div
            className={classNames('shadow-sm', {
              'd-flex': isHorizontal,
              'mt-md-n3': !isHorizontal
            })}
          >
            { children }
          </div>
        </div>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isHorizontal: PropTypes.bool
}

Layout.defaultProps = {
  isHorizontal: false
}

export default {
  Layout,
  Header: FeedbackHeader,
  Content: FeedbackContent,
  Links: FeedbackLinks,
  Link: FeedbackLink,
  Left: FeedbackLeft,
  Right: FeedbackRight,
  Title: FeedbackTitle
}
