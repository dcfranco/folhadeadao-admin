import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { useSelector } from 'react-redux'
import Spinner from 'components/Spinner'
import { Router } from 'react-router-dom/'

const App = ({ history, profile }) => {
  const isLoading = useSelector(state => state.app.get('spinner'))

  useEffect(() => {
    moment.locale('pt-br')
  }, [])

  return (
    <Router history={history}>
      <Fragment>
        { isLoading && <Spinner /> }
        { profile.render() }
      </Fragment>
    </Router>
  )
}

App.propTypes = {
  history: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

export default React.memo(App)
