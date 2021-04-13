import React from 'react'
import {
  Container
} from 'components'
import {
  COLORS,
  BREAKPOINTS,
  FONTS,
} from '../../themes'

export class HomePage extends React.Component {
  render() {
    return (
      <Container>
        Test
        {console.log('test color ' + COLORS.BLACK)}
        {console.log('test breakpoint ' + BREAKPOINTS.MOBILE_XS_MAX)}
        {console.log('test font ' + FONTS.FAMILIES.FIRST_MEDIUM)}

        {console.log('test' + COLORS)}
      </Container>
    )
  }
}
