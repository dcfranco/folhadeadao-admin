import { createSelector } from 'reselect'

const getFunnels = (seller) => seller.reports.get('results')

export const getDashboardFunnels = createSelector(
  getFunnels,
  (funnels) => {
    return funnels.sort((funnelA, funnelB) => {
      return (funnelA.getAsMoment('createdAt').isAfter(funnelB.getAsMoment('createdAt'))) ? -1 : 1
    }).reverse().reduce((report, funnel) => {
      const createdAt = funnel.getFormatedDate('createdAt')
      if (Object.keys(report).includes(createdAt)) {
        return {
          ...report,
          [createdAt]: report[createdAt].concat(funnel)
        }
      }

      return {
        ...report,
        [createdAt]: [funnel]
      }
    }, {})
  }
)

export const getDashboardOpenClosedFunnels = createSelector(
  getFunnels,
  (funnels) => {
    return funnels.reduce((report, funnel) => {
      if (funnel.get('hasFinished')) {
        return {
          ...report,
          open: report.open.concat(funnel)
        }
      }

      return {
        ...report,
        closed: report.closed.concat(funnel)
      }
    }, { open: [], closed: [] })
  }
)
