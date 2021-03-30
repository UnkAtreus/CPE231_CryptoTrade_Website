import React from 'react'
import ClassNames from 'classnames'
import PropTypes from 'prop-types'

import Swiper from 'react-id-swiper'
import './css/swiper.min.css'
//https://www.npmjs.com/package/react-id-swiper

import {
  SwiperCarouselStyle,
  SwiperItemStyle
} from './styled'

class SwiperItem extends React.PureComponent {
  render() {
    const {
      className,
      children,
      onClick
    } = this.props

    return (
      <SwiperItemStyle
        onClick={onClick}
        className={ClassNames(
          'swiper-item',
          className
        )}
      >
        {children}
      </SwiperItemStyle>
    )
  }

  static propTypes = { // TYPE > node, string, func, bool
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string
    ]),
    onClick: PropTypes.func,
  }
}

export class SwiperCarousel extends React.PureComponent {
  static Item = SwiperItem

  render() {
    const {
      children,
      className,
      params,
      onSlideChange,
      onInit,
    } = this.props

    params.on = {
      slideChange: () => {
        onSlideChange()
      },
      init: () => {
        onInit()
      }
    }

    return (
      <SwiperCarouselStyle className={ClassNames(
        'swiper-carousel',
        className
      )}>
        <Swiper
          shouldSwiperUpdate={true}
          {...params}
          {...this.props}
        >
          {children}
        </Swiper>
      </SwiperCarouselStyle>
    )
  }

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string
    ]),
    onSlideChange: PropTypes.func,
    onInit: PropTypes.func,
  }

  static defaultProps = {
    params: {
      slidesPerView: 'auto',
      spaceBetween: 0
    },
    onSlideChange: () => { },
    onInit: () => { },
  }
}
