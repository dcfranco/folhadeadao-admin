import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Pie, defaults } from 'react-chartjs-2'
import { ReceiptOutlined } from '@material-ui/icons'

defaults.scale.ticks.beginAtZero = true

const PieChart = ({ className, title, data, children }) => {
  return (
    <div className={classNames('chart shadow-sm', className)}>
      { title && (<span className='chart-title'><ReceiptOutlined className='mr-auto' /> <span className='mr-auto'>{ title }</span></span>)}
      <Pie
        data={data}
      />
      { children }
    </div>
  )
}

PieChart.propTypes = {
  title: PropTypes.string,
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

PieChart.defaultProps = {
  className: '',
  title: null
}

export default PieChart
