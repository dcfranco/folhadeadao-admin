import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Bar, defaults } from 'react-chartjs-2'

defaults.scale.ticks.beginAtZero = true

const Chart = ({ className, data, children }) => {
  return (
    <div className={classNames('chart shadow-sm', className)}>
      <Bar
        data={data}
      />
      { children }
    </div>
  )
}

Chart.propTypes = {
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

Chart.defaultProps = {
  className: ''
}

export default Chart
