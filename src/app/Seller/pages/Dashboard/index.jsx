import React, { useEffect } from 'react'
import { reportSellerAsyncRequest } from 'seller/actions/reports'
import Layout, { ColumnWrapper, ColumnLeft, Title } from 'templates/PageTemplate'
import { useDispatch, useSelector } from 'react-redux'
import { getDashboardFunnels } from 'seller/selectors/reports'
import FunnelsCreated from './FunnelsCreated'
import FunnelsFinished from './FunnelsFinished'

const Dashboard = () => {
  const dispatch = useDispatch()
  const sellerId = useSelector((state) => state.user.getIn(['data', 'seller', 'id']))
  const funnels = useSelector(({ seller }) => getDashboardFunnels(seller))

  useEffect(() => {
    dispatch(reportSellerAsyncRequest(sellerId))
  }, [sellerId])

  if (!funnels || funnels.size === 0) {
    return null
  }

  return (
    <Layout>
      <ColumnWrapper className='mb-2 mt-4'>
        <ColumnLeft>
          <Title>Dashboard</Title>
        </ColumnLeft>
      </ColumnWrapper>
      <FunnelsCreated />
      <FunnelsFinished />
    </Layout>
  )
}

export default Dashboard
