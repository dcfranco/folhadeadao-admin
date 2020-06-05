import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Search } from '@material-ui/icons'
import { Field, Form, reduxForm } from 'redux-form/immutable'
import SearchFormRender from 'components/SearchFormRender'
import { sellersUpdateFilters, sellersUpdatePage } from 'admin/actions/sellers'

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

const SellersSearchForm = ({ handleSubmit, submit, initialize, requestSellersList }) => {
  const dispatch = useDispatch()
  const search = useSelector(({ admin }) => admin.sellers.getIn(['filters', 'search']))

  useEffect(() => {
    if (search) {
      initialize({
        search
      })
    }
  }, [search])

  const onSubmit = async (values) => {
    await dispatch(sellersUpdatePage(0))
    await dispatch(sellersUpdateFilters(values.get('search')))
    setTimeout(() => requestSellersList())
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

SellersSearchForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  requestSellersList: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'sellersSearchForm',
  pure: true
})(SellersSearchForm)
