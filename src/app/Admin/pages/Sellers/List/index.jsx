import React, { Fragment, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Cards, { Card, CardRow, CardTitle, CardContent, CardInfo } from 'components/Cards'
import { ColumnWrapper, ColumnLeft, Title, Container } from 'templates/PageTemplate'
import { sellersAsyncRequest, sellersUpdatePage } from 'admin/actions/sellers'
import { bindPathParams } from 'helpers'
import Pagination from 'components/Pagination'
import SellersSearchForm from 'admin/components/SellersSearchForm'

const SellersList = ({ profile: { pages: profilePages } }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const sellers = useSelector(({ admin }) => admin.sellers.get('results'))
  const options = useSelector(({ admin }) => admin.sellers.get('options'))
  const pages = useSelector(({ admin }) => admin.sellers.getTotalPages())
  const selectedPage = options.get('currentPageIndex')

  const requestSellersList = useCallback(() => {
    dispatch(sellersAsyncRequest())
  }, [])

  useEffect(() => {
    requestSellersList()
  }, [selectedPage])

  const onPageChange = useCallback((page) => async () => {
    dispatch(sellersUpdatePage(page))
  }, [])

  const onSellerClick = useCallback((seller) => () => {
    const route = bindPathParams({
      userId: seller.getIn(['user', 'id'])
    }, profilePages.USERS.VIEW)
    history.push(route)
  }, [])

  return (
    <Fragment>
      <SellersSearchForm requestSellersList={requestSellersList} />
      <ColumnWrapper>
        <ColumnLeft>
          <Title>Representantes</Title>
        </ColumnLeft>
      </ColumnWrapper>
      <Container>
        { sellers.size > 0 ? (
          <Cards>
            { sellers.map((seller) => {
              const user = seller.get('user')
              return (
                <Card
                  key={seller.get('id')}
                  onClick={onSellerClick(seller)}
                >
                  <CardRow>
                    <CardTitle isAvatarVisible={true}>
                      { user.getFullName() }
                    </CardTitle>
                  </CardRow>
                  <CardContent>
                    <CardInfo title='Último acesso'>
                      { user.getFormatedDate('lastLogin') }
                    </CardInfo>
                    <CardInfo title='Bloqueado'>
                      { user.get('isBlocked') ? 'Não' : 'Sim' }
                    </CardInfo>
                  </CardContent>
                </Card>
              )
            }) }
          </Cards>
        ) : (
          <div>
            Sem resultado
          </div>
        )}
      </Container>
      <ColumnWrapper>
        <ColumnLeft>
          <Pagination
            pages={pages}
            selectedPage={selectedPage}
            onChange={onPageChange}
          />
        </ColumnLeft>
      </ColumnWrapper>
    </Fragment>
  )
}

SellersList.propTypes = {
  profile: PropTypes.object.isRequired
}

export default React.memo(SellersList)
