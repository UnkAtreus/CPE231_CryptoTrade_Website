import React from 'react'
import {
  Container,
  TransitionContainer
} from 'components'
import {
  ROUTE_PATH,
  redirect
} from 'helpers'

export class AboutPage extends React.Component {
  render() {
    return (
      <TransitionContainer
      // motion='overlap-to'
      >
        <Container height='100vh' paddingTop='30px' bgColor='lightblue'>
          <h1>{ROUTE_PATH.ABOUT.TEXT}</h1>
          <button
            onClick={() => {
              redirect(ROUTE_PATH.HOME.LINK)
            }}
          >
            Go to {ROUTE_PATH.HOME.TEXT}
          </button>
        </Container>
      </TransitionContainer>
    )
  }
}
