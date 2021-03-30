import React from 'react'
import {
  MainLayoutStyled
} from './styled'

export class MainLayoutContainer extends React.Component {
  render() {
    const {
      children,
    } = this.props

    return (
      <MainLayoutStyled>
        {children}
      </MainLayoutStyled>
    )
  }
}
