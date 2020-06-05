import { createSelector } from 'reselect'
import moment from 'moment'

export const getAlerts = (state) => state.alerts.get('results')

export const getDashboardAlerts = createSelector(
  getAlerts,
  (alerts) => {
    return alerts.groupBy((alert) => moment(alert.get('data')).format('DD/MM'))
  }
)
