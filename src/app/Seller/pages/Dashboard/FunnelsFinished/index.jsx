import React, { useEffect } from 'react'
import PieChart from 'components/PieChart'
import { reportSellerAsyncRequest } from 'seller/actions/reports'
import { useDispatch, useSelector } from 'react-redux'
import { getDashboardOpenClosedFunnels } from 'seller/selectors/reports'

const FunnelsCreated = () => {
  const dispatch = useDispatch()
  const sellerId = useSelector((state) => state.user.getIn(['data', 'seller', 'id']))
  const funnels = useSelector(({ seller }) => getDashboardOpenClosedFunnels(seller))

  useEffect(() => {
    dispatch(reportSellerAsyncRequest(sellerId))
  }, [sellerId])

  if (!funnels || funnels.size === 0) {
    return null
  }

  return (
    <PieChart
      title='Abertos e Concluídos'
      data={{
        labels: ['Abertos', 'Concluídos'],
        datasets: [{
          label: 'Links',
          backgroundColor: ['#3a3a3a', '#DBBC7C'],
          data: Object.values(funnels).map((v) => v.length),
          barPercentage: 0.2
        }]
      }}
    />
  )
}

export default FunnelsCreated
