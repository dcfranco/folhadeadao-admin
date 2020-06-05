import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Search } from '@material-ui/icons'
import { Field, Form, reduxForm } from 'redux-form/immutable'
import SearchFormRender from 'components/SearchFormRender'
import { funnelsUpdateFilters, funnelsUpdatePage } from 'seller/actions/funnels'

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

const FunnelsSearchForm = ({ handleSubmit, submit, initialize, requestFunnelsList }) => {
  const dispatch = useDispatch()
  const search = useSelector(({ seller }) => seller.funnels.getIn(['filters', 'search']))

  useEffect(() => {
    if (search) {
      initialize({
        search
      })
    }
  }, [search])

  const onSubmit = async (values) => {
    await dispatch(funnelsUpdatePage(0))
    await dispatch(funnelsUpdateFilters(values.get('search')))
    setTimeout(() => requestFunnelsList())
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

FunnelsSearchForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  requestFunnelsList: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'funnelsSearchForm',
  pure: true
})(FunnelsSearchForm)
