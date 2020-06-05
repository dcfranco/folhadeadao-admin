import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const InputAddonBuilder = (displayName = 'InputAddon') => {
  // Direction (Right or Left)
  let _position

  // Render method
  let _renderMethod

  // Render Text
  let _renderText

  // ClassNames
  let _classNames

  const builder = {
    leftPosition: () => {
      _position = 'left'
      return builder
    },
    rightPosition: () => {
      _position = 'right'
      return builder
    },
    renderMethod: renderMethodFn => {
      _renderMethod = renderMethodFn
      return builder
    },
    renderText: renderTextFn => {
      _renderText = renderTextFn
      return builder
    },
    classNames: classNamesFn => {
      _classNames = classNamesFn
      return builder
    },
    build: () => {
      if (!_position) {
        throw new Error('Position (left or right) is required')
      }
      const isLeft = _position === 'left'
      const defaultClassNames = {
        inputGroupText: ['input-group-text']
      }
      defaultClassNames['inputGroup'] = isLeft
        ? ['input-group-prepend']
        : ['input-group-append']

      const css = _classNames
        ? _classNames(defaultClassNames)
        : defaultClassNames

      if (!css || !css.inputGroup || !css.inputGroupText) {
        throw new Error('You must return the same keys [inputGroup, inputGroupText]')
      }

      const { inputGroup, inputGroupText } = css
      const InputAddon = ({ input, onLeftAddonClick, onRightAddonClick }) => {
        const _onClick = isLeft ? onLeftAddonClick : onRightAddonClick
        return (
          <div
            className={classNames(...inputGroup, {
              'clickable': typeof _onClick === 'function'
            })}
            onClick={() => typeof _onClick === 'function' && _onClick(input)}
          >
            { _renderMethod && _renderMethod() }
            { _renderText && (
              <span className={classNames(...inputGroupText)}>
                { _renderText() }
              </span>
            )}
          </div>
        )
      }

      InputAddon.displayName = displayName
      InputAddon.propTypes = {
        onLeftAddonClick: PropTypes.func,
        onRightAddonClick: PropTypes.func,
        input: PropTypes.object
      }
      InputAddon.defaultProps = {
        onLeftAddonClick: () => {},
        onRightAddonClick: () => {},
        input: {}
      }

      return InputAddon
    }
  }

  return builder
}

export default InputAddonBuilder
