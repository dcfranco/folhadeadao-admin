import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import useThemes from 'hooks/useThemes'
import AppLoader from 'components/AppLoader'

const ThemeRender = ({ theme, children }) => {
  const appThemes = useThemes()
  const [canRender, toggleCanRender] = useState(true)

  useEffect(() => {
    toggleCanRender(false)
  }, [theme])

  useEffect(() => {
    if (!canRender) {
      setTimeout(() => toggleCanRender(true), 1000)
    }
  }, [canRender])

  return (
    <Fragment>
      <Helmet>
        <link rel='stylesheet' href={appThemes[theme]} />
      </Helmet>
      { children && (canRender ? children : <AppLoader />) }
    </Fragment>
  )
}

ThemeRender.propTypes = {
  children: PropTypes.node,
  theme: PropTypes.string
}

ThemeRender.defaultProps = {
  children: null,
  theme: 'default'
}

export default React.memo(ThemeRender)
