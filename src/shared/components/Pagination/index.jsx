import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class Pagination extends Component {
  static propTypes = {
    pages: PropTypes.number.isRequired,
    selectedPage: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    let skip = 0
    let limit = 5
    if (window.innerWidth <= 991) {
      limit = 3
    }

    if (props.selectedPage > 0) {
      skip = (Math.ceil((props.selectedPage + 1) / limit) - 1) * limit
    }

    this.state = {
      skip,
      limit
    }
  }

  shouldComponentUpdate(nextProps) {
    const { selectedPage } = this.props

    if (nextProps.selectedPage !== selectedPage) {
      const { limit } = this.state
      let skip = 0
      if (nextProps.selectedPage > 0) {
        skip = (Math.ceil((nextProps.selectedPage + 1) / limit) - 1) * limit
      }
      this.setState({ skip })
    }
    return true
  }

  onShowMorePages = () => {
    const { skip, limit } = this.state
    this.setState({
      skip: skip + limit
    })
  }

  onShowLessPages = () => {
    const { skip, limit } = this.state
    this.setState({
      skip: skip - limit
    })
  }

  render() {
    const { pages, selectedPage, onChange } = this.props

    if (pages === 0) {
      return null
    }

    const disableFirstAndPrevButtons = pages === 0 || selectedPage === 0
    const disableLastAndNextButtons = pages === 0 || selectedPage === (pages - 1)
    const pagesArr = Array.from(Array(pages)).map((item, index) => index)

    const { skip, limit } = this.state
    return (
      <nav>
        <ul className='pagination'>
          <li className='page-item'>
            <button
              type='button'
              className='page-link'
              onClick={() => !disableFirstAndPrevButtons && onChange(0)()}
            >
              <span aria-hidden='true'>&laquo;</span>
            </button>
          </li>
          { skip >= limit && (
            <li className='page-item'>
              <button
                type='button'
                className='page-link'
                onClick={this.onShowLessPages}
              >
                ...
              </button>
            </li>
          ) }
          { pagesArr.slice(skip, (skip + limit)).map((val) => (
            <li
              key={`_${val + 1}`}
              className={classNames('page-item', {
                'active': val === selectedPage
              })}
            >
              <button
                type='button'
                className='page-link'
                onClick={onChange(val)}
              >
                { val + 1 }
              </button>
            </li>
          )) }
          { (pagesArr.length - skip) > limit && (
            <li className='page-item'>
              <button
                type='button'
                className='page-link'
                onClick={this.onShowMorePages}
              >
                ...
              </button>
            </li>
          ) }
          <li className='page-item'>
            <button
              type='button'
              className='page-link'
              onClick={() => !disableLastAndNextButtons && onChange(pages - 1)()}
            >
              <span aria-hidden='true'>&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Pagination
