import React from 'react'
import ClassNames from 'classnames'
import PropTypes from 'prop-types'
import {
  isAndroid,
  isIOS,
  isChrome,
  isSafari,
  isMobileSafari
} from 'react-device-detect'
import {
  DeviceDetectWrapper
} from './styled'

/**
 * DeviceDetect description:
 * - Wrapper container for add device environment classes
 * - https://github.com/duskload/react-device-detect/
 */

export class DeviceDetect extends React.PureComponent {
  render() {
    const {
      className,
      children
    } = this.props

    // props for css classes
    const classes = ClassNames(
      'device-detect-container',
      { 'is-android': isAndroid },
      { 'is-ios': isIOS },
      { 'is-chrome': isChrome },
      { 'is-safari': isSafari },
      { 'is-mobile-safari': isMobileSafari },
      className
    )

    return (
      <DeviceDetectWrapper
        className={classes}
      >
        {children}
      </DeviceDetectWrapper>
    )
  }

  static propTypes = { // TYPE > node, string, number, bool, array, object, symbol, func
    /**
    * Additional classes
    */
    className: PropTypes.string,

    /**
    * Additional Text, HTML, Component
    */
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string
    ]),

    /**
    * Consdition for add device environment classes to wrapper container
    */
    isAndroid: PropTypes.bool,

    /**
    * Consdition for add device environment classes to wrapper container
    */
    isIOS: PropTypes.bool,

    /**
    * Consdition for add device environment classes to wrapper container
    */
    isChrome: PropTypes.bool,

    /**
    * Consdition for add device environment classes to wrapper container
    */
    isSafari: PropTypes.bool,

    /**
    * Consdition for add device environment classes to wrapper container
    */
    isMobileSafari: PropTypes.bool
  }
}
