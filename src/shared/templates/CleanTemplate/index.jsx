import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Container from 'components/Container'

import CleanContainer from './Container'
import CleanHeaderLogo from './HeaderLogo'
import CleanLogo from './Logo'
import CleanContent from './Content'
import CleanBanner from './Banner'
import CleanHeaderTitle from './HeaderTitle'
import CleanTitle from './Title'
import CleanFooter from './Footer'
import CleanListContainer from './ListContainer'
import CleanList from './List'
import CleanListHeader from './ListHeader'
import CleanListItem from './ListItem'

const Layout = ({ children, className }) => {
  useEffect(() => {
    document.body.style.backgroundColor = '#8a8a8a'
  }, [])
  return (
    <Container className={classNames('clean-template', className)}>
      { children }
    </Container>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

Layout.defaultProps = {
  className: ''
}

export default {
  Layout,
  Logo: CleanLogo,
  List: CleanList,
  ListItem: CleanListItem,
  ListHeader: CleanListHeader,
  ListContainer: CleanListContainer,
  Title: CleanTitle,
  Footer: CleanFooter,
  Banner: CleanBanner,
  Content: CleanContent,
  Container: CleanContainer,
  HeaderLogo: CleanHeaderLogo,
  HeaderTitle: CleanHeaderTitle
}
