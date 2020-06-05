import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

@connect(state => ({
  progressBar: state.progressBar.get('data')
}))
class ProgressBar extends Component {
  static propTypes = {
    progressBar: PropTypes.object.isRequired
  }

  render() {
    const { progressBar } = this.props
    if (!progressBar.get('opened')) {
      return null
    }

    const percent = progressBar.getPercent()

    return (
      <div className='progressbar-container'>
        <div className='progressbar-content'>
          <div className='d-flex mb-1'>
            <span className='d-block font-weight-bold small mr-auto'>Carregando</span>
            <span className='d-block small'>{ `${percent}%` }</span>
          </div>
          <div className='progress'>
            <div
              className='progress-bar progress-bar-striped progress-bar-animated'
              role='progressbar'
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className='d-flex mt-2'>
            <span className='d-block small text-muted'>
              { `Enviando item ${progressBar.get('currentStep')} de ${progressBar.get('totalSteps')}...` }
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default ProgressBar
