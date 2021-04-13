import React from 'react'
import { HashLoader } from 'react-spinners'
// https://www.npmjs.com/package/react-spinners

import { LoadingStyle } from './style'
//import { VARIABLES } from 'themes'

export class Loading extends React.PureComponent {
  render() {
    const { loading } = this.props
    return loading ? (
      <LoadingStyle className='loading-wrapper loading'>
        <HashLoader loading color='blue' />
      </LoadingStyle>
    ) : null
  }
}
