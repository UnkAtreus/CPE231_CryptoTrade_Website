import React from 'react'
import ClassNames from 'classnames'
import PropTypes from 'prop-types'

import {
  ContainerStyle
} from './styled'

export const Container = ({ className,
  children, }) => {

  Container.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.string
    ]),
  }

  return (
    <ContainerStyle
      className={ClassNames(
        'container',
        className
      )}
    >
      {children}
    </ContainerStyle>
  );
};
