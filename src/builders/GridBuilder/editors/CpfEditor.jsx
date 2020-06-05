import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import MaskedInput from 'react-text-mask'
import { cpfValidator } from 'form/validators'

class CpfEditor extends PureComponent {
  constructor(props) {
    super(props)
    this.input = React.createRef()
    this.state = {
      value: props.value || ''
    }
  }

  getValue() {
    const { column } = this.props
    const { value } = this.state
    return {
      [column.key]: value
    }
  }

  getInputNode() {
    const { current } = this.input
    if (current) {
      return current.inputElement
    }
    return null
  }

  validate(values) {
    const { column } = this.props
    const value = values[column.key]
    return !(typeof value === 'string' && cpfValidator(value))
  }

  render() {
    const { value } = this.state
    const { onBlur } = this.props

    return (
      <MaskedInput
        mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
        className='form-control'
        ref={this.input}
        value={value}
        onBlur={onBlur}
        guide={false}
        keepCharPositions={true}
        onChange={({ currentTarget: { value: v } }) => this.setState({ value: v })}
      />
    )
  }
}


CpfEditor.propTypes = {
  value: PropTypes.any,
  column: PropTypes.object,
  onBlur: PropTypes.func
}

CpfEditor.defaultProps = {
  value: 0,
  column: {},
  onBlur: () => {}
}

export default CpfEditor
