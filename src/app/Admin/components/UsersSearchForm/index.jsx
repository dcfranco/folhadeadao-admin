import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Search } from '@material-ui/icons'
import { Field, Form, reduxForm } from 'redux-form/immutable'
import SearchFormRender from 'components/SearchFormRender'
import { usersUpdateFilters, usersUpdatePage } from 'admin/actions/users'

import ReduxFormInputBuilder from 'components/ReduxFormInput/Builder'
import InputAddonBuilder from 'components/ReduxFormInput/builders/InputAddonBuilder'

const InputAddon = InputAddonBuilder()
  .rightPosition()
  .renderMethod(() => (
    <div className='icon-right-addon'>
      <Search />
    </div>
  ))
  .build()

const ReduxFormInputWithAddon = ReduxFormInputBuilder()
  .rightAddon(InputAddon)
  .disableMargin()
  .build()

const UsersSearchForm = ({ handleSubmit, submit, initialize, requestUsersList }) => {
  const dispatch = useDispatch()
  const search = useSelector(({ admin }) => admin.users.getIn(['filters', 'search']))

  useEffect(() => {
    if (search) {
      initialize({
        search
      })
    }
  }, [search])

  const onSubmit = async (values) => {
    await dispatch(usersUpdatePage(0))
    await dispatch(usersUpdateFilters(values.get('search')))
    setTimeout(() => requestUsersList())
  }

  return (
    <SearchFormRender>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Field
          type='text'
          name='search'
          id='search'
          placeholder='Buscar por nome, cpf...'
          component={ReduxFormInputWithAddon}
          onRightAddonClick={() => submit()}
          noMargin={true}
        />
      </Form>
    </SearchFormRender>
  )
}

UsersSearchForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  requestUsersList: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'usersSearchForm',
  pure: true
})(UsersSearchForm)
