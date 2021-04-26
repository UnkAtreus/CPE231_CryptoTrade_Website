import React from 'react'
import ClassNames from 'classnames'

import {
  ModalStyle,
  ModalContentStyle,
  ModalHeaderStyle,
  ModalBodyStyle,
  ModalFooterStyle,
  ModalBackgroundStyle,
  ModalCloseButtonStyle,
  ModalDialogStyle,
} from './style'
// import {
//   Image,
//   Button,
//   Section,
// } from 'components'
// import { ICONS } from 'themes'

const ModalHeaderContainer = props => {
  const {
    className, //
    children
  } = props

  return (
    <ModalHeaderStyle className={ClassNames('modal-header', className)}>
      {children}
    </ModalHeaderStyle>
  )
}

const ModalBodyContainer = React.forwardRef((props, ref) => {
  const {
    className, //
    children,
  } = props
  return (
    <ModalBodyStyle
      className={ClassNames('modal-body', className)}
      ref={ref}
    >
      {children}
    </ModalBodyStyle>
  )
})

const ModalFooterContainer = props => {
  const {
    className, //
    children
  } = props
  return (
    <ModalFooterStyle className={ClassNames('modal-footer', className)}>
      {children}
    </ModalFooterStyle>
  )
}

const ModalBackgroundContainer = props => {
  const {
    onClick
  } = props
  return (
    <ModalBackgroundStyle
      className='modal-background'
      onClick={onClick}
    />

  )
}

const ModalDialogContainer = props => {
  const {
    children
  } = props
  return (
    <ModalDialogStyle
      className='modal-dialog'
    >
      {children}
    </ModalDialogStyle>
  )
}

const ModalContentContainer = props => {
  const {
    className, //
    children,
    onClick
  } = props
  return (
    <React.Fragment>
      <ModalContentStyle
        className={ClassNames('modal-content', className)}
        onClick={onClick}
      >
        {children}
      </ModalContentStyle>
    </React.Fragment>
  )
}

const ModalCloseButtonContainer = props => {
  const {
    className, //
    children,
    closeSrc,
    onClick,
  } = props
  return (
    <React.Fragment>
      <ModalCloseButtonStyle
        className={ClassNames('modal-close-button', className)}
        onClick={onClick}
      >
        {children ? children : <div />}
      </ModalCloseButtonStyle>
    </React.Fragment>
  )
}

export class Modal extends React.Component {
  static Header = ModalHeaderContainer
  static Body = ModalBodyContainer
  static Footer = ModalFooterContainer
  static CloseButton = ModalCloseButtonContainer

  renderPopupUI = (popupTitle, popupContent, popupOnClickOK) => {
    return (
      <React.Fragment>
        {/* <ModalBodyContainer> */}
          {/* <Section className='title'>
            {popupTitle}
          </Section>

          <Section className='content'>
            {popupContent}
          </Section>
        </ModalBodyContainer>

        <ModalFooterContainer>
          <Button onClick={popupOnClickOK}>
            OK
          </Button> */}
        {/* </ModalFooterContainer> */}
      </React.Fragment>

    )
  }

  render() {
    const {
      className, //
      children,
      onClickClose,
      isModalOpen,
      hideCloseButton,
      onClickBackground,
      popupUI,
      popupTitle,
      popupContent,
      popupOnClickOK
    } = this.props

    return (
      <React.Fragment>
        <ModalStyle
          className={ClassNames(
            'modal',
            isModalOpen ? 'open' : null,
            {'popup-ui' : popupUI},
            className
          )}
        >
          <ModalDialogContainer className='modal-dialog'>
            <ModalBackgroundContainer
              onClick={onClickBackground}
              className='modal-background'
            />

            <ModalContentContainer
              className='modal-content'
            >
              {
                popupUI ?
                  this.renderPopupUI(popupTitle, popupContent, popupOnClickOK)
                :
                  children
              }
              {
                !hideCloseButton && (
                  <ModalCloseButtonContainer onClick={onClickClose} />
                )
              }
            </ModalContentContainer>
          </ModalDialogContainer>
        </ModalStyle>
      </React.Fragment >
    )
  }
}

Modal.defaultProps = {
  isModalOpen: false,
  hideCloseButton: true,
  popupUI: true
}

ModalHeaderContainer.defaultProps = {}

ModalBodyContainer.defaultProps = {}

ModalFooterContainer.defaultProps = {}

ModalBackgroundContainer.defaultProps = {}

ModalCloseButtonContainer.defaultProps = {
  closeSrc: 'icon-close.svg'
}
