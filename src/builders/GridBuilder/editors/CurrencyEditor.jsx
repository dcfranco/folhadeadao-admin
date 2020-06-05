import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { parseCurrency } from 'helpers'

const defaultMaskOptions = {
  prefix: 'R$ ',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: '.',
  allowDecimal: true,
  decimalSymbol: ','
}

const currencyMask = createNumberMask(defaultMaskOptions)

class CurrencyEditor extends PureComponent {
  constructor(props) {
    super(props)
    this.input = React.createRef()
    this.state = {
      value: parseCurrency(props.value)
    }
  }

  getInputNode() {
    const { current } = this.input
    if (current) {
      return current.inputElement
    }
    return null
  }

  getValueParsed() {
    const { value } = this.state
    if (typeof value === 'string') {
      return parseFloat(value.replace('.', '').replace(',', '.').replace(/[^\d.]/g, '')) || 0
    }
    return 0
  }

  getValue() {
    const { column } = this.props
    return {
      [column.key]: this.getValueParsed()
    }
  }

  render() {
    const { value } = this.state
    const { onBlur } = this.props

    return (
      <MaskedInput
        mask={currencyMask}
        className='form-control text-right'
        ref={this.input}
        value={value}
        onBlur={onBlur}
        onChange={({ currentTarget: { value: v } }) => this.setState({ value: v })}
      />
    )
  }
}


CurrencyEditor.propTypes = {
  value: PropTypes.any,
  column: PropTypes.object,
  onBlur: PropTypes.func
}

CurrencyEditor.defaultProps = {
  value: 0,
  column: {},
  onBlur: () => {}
}

export default CurrencyEditor
