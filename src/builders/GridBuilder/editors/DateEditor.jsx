import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import MaskedInput from 'react-text-mask'
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'
import { dateRequired } from 'form/validators'

const currencyMask = createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM', {
  minYear: 1900,
  maxYear: 3000
})

class DateEditor extends PureComponent {
  constructor(props) {
    super(props)
    this.input = React.createRef()
    this.state = {
      value: props.value || ''
    }
  }

  getInputNode() {
    const { current } = this.input
    if (current) {
      return current.inputElement
    }
    return null
  }

  getValue() {
    const { column } = this.props
    const { value } = this.state
    return {
      [column.key]: value || ''
    }
  }

  validate() {
    const { value } = this.state
    return value === '' || !dateRequired(value)
  }

  render() {
    const { value } = this.state
    const { onBlur } = this.props

    return (
      <MaskedInput
        pipe={currencyMask}
        mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
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


DateEditor.propTypes = {
  value: PropTypes.any,
  column: PropTypes.object,
  onBlur: PropTypes.func
}

DateEditor.defaultProps = {
  value: 0,
  column: {},
  onBlur: () => {}
}

export default DateEditor
