import React from 'react'
import ClassNames from 'classnames'
// import PropTypes from 'prop-types'

import {
  SectionStyle
} from './styled'

export class Section extends React.PureComponent {
  render() {
    const {
      className,
      children,
    } = this.props

    return (
      <SectionStyle
        className={ClassNames(
          'section',
          className
        )}
        {...this.props}
      >
        {children}
      </SectionStyle>
    )
  }
}
