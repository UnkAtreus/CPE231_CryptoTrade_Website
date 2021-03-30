import React from 'react'
import Classnames from 'classnames'
import PropTypes from 'prop-types'
import {
  ImageStyle, //
} from './styled'

export class Image extends React.PureComponent {
  render() {
    const {
      className, //
      src,
      alt,
    } = this.props

    return (
      <ImageStyle className={Classnames(
        'image-control', //
        className
      )}>
        <img
          src={src}
          alt={alt}
          className='image'
        />
      </ImageStyle>
    )
  }

  static defaultProps = {
    alt: 'Image',
  }

  static propTypes = {
    /**
     * [Image] and [Image.Children] - additional classes
     */
    className: PropTypes.string,
  }
}
