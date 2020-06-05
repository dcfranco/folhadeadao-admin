import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class CheckboxEditor extends PureComponent {
  constructor(props) {
    super(props)
    this.input = React.createRef()
    this.state = {
      value: props.value
    }
  }

  getInputNode() {
    const { current } = this.input
    if (current) {
      return current
    }
    return null
  }

  getValue() {
    const { column } = this.props
    const { value } = this.state
    return {
      [column.key]: value
    }
  }

  render() {
    const { value } = this.state
    const { onBlur, column } = this.props

    return (
      <div className='form-check d-block w-100 text-center pt-1' ref={this.input}>
        <input
          type='checkbox'
          onChange={() => this.setState({ value: !value })}
          checked={value === true}
          className='form-check-input position-static'
          name={column.key}
          onBlur={onBlur}
        />
      </div>
    )
  }
}

CheckboxEditor.propTypes = {
  value: PropTypes.any,
  column: PropTypes.object,
  onBlur: PropTypes.func
}

CheckboxEditor.defaultProps = {
  value: 0,
  column: {},
  onBlur: () => {}
}

export default CheckboxEditor
