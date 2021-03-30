import React from 'react'
import ClassNames from 'classnames'
import PropTypes from 'prop-types'

import {
  ContainerStyle
} from './styled'

export class Container extends React.PureComponent {
  render() {
    const {
      className,
      children,
    } = this.props

    return (
      <ContainerStyle
        className={ClassNames(
          'container',
          className
        )}
      >
        {children}
      </ContainerStyle>
    )
  }

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string
    ]),
  }
}
