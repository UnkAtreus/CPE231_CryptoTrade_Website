import React from 'react'
import ClassNames from 'classnames'
import PropTypes from 'prop-types'
import {
  ButtonStyle
} from './styled'

/**
 * Button description
 * - ...
 */

export class Button extends React.PureComponent {
  render() {
    const {
      className,
      children,
      onClick
    } = this.props

    return (
      <ButtonStyle
        className={ClassNames(
          'button',
          className
        )}
        onClick={onClick}
      >
        {children}
      </ButtonStyle>
    )
  }
}
