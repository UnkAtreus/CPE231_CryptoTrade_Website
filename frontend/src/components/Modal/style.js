import styled from 'styled-components'
import { default as VARIABLES } from '../../themes/styles/variables'
// Modifier (props)
// ============================================================

// Core
// ============================================================
export const ModalStyle = styled.div`
  /* Parent styles
  ------------------------------- */
  position: fixed;
  opacity: 0;
  display: block;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${VARIABLES.Z_INDEXS.NEGATIVE_3};
  justify-content: center;
  transition: all ${VARIABLES.TRANSITIONS.FAST} ease-in;
  overflow-y: auto;

  /* Child element styles
  ------------------------------- */

  /* States
  ------------------------------- */
  &.open {
    opacity: 1;
    z-index: ${VARIABLES.Z_INDEXS.LV_6};
    width: 100%;
    height: 100%;
    transition: all ${VARIABLES.TRANSITIONS.FAST} ease-out;

    &.popup-ui {
      .modal-content {
        top: 40%;
      }
    }
  }

  /* Modifiers
  ------------------------------- */

  /* States with modifiers
  ------------------------------- */

  /* Media queries
  ------------------------------- */

  @media (max-width: 767.98px) {
  }
`

export const ModalDialogStyle = styled.div`
  /* Parent styles
  ------------------------------- */
  display: flex;
  position: relative;
  min-height: 100%;
  max-width: none;
  margin: 0;

  /* Child element styles
  ------------------------------- */

  /* States
  ------------------------------- */

  /* Modifiers
  ------------------------------- */

  /* States with modifiers
  ------------------------------- */

  /* Media queries
  ------------------------------- */
`

export const ModalContentStyle = styled.div`
  position: relative;
  display: block;
  top: -100vh;
  width: 100%;
  max-width: 1045px;
  transition: all ${VARIABLES.TRANSITIONS.FAST} ease-out;
  margin: 0 auto;
  max-width: 1045px;
`

export const ModalBackgroundStyle = styled.div`
  /* Parent styles
  ------------------------------- */
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  background-color: ${VARIABLES.COLORS.BACKGROUND_MODAL};

  /* Child element styles
  ------------------------------- */

  /* States
  ------------------------------- */

  /* Modifiers
  ------------------------------- */

  /* States with modifiers
  ------------------------------- */

  /* Media queries
  ------------------------------- */
`

export const ModalHeaderStyle = styled.div`
  /* Parent styles
  ------------------------------- */
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;

  /* Child element styles
  ------------------------------- */

  /* States
  ------------------------------- */

  /* Modifiers
  ------------------------------- */

  /* States with modifiers
  ------------------------------- */

  /* Media queries
  ------------------------------- */
  @media (max-width: 839.98px) {
  }

  @media (max-width: 767.98px) {
  }
`

export const ModalBodyStyle = styled.div`
  /* Parent styles
  ------------------------------- */
  padding-bottom: 30px;

  /* Child element styles
  ------------------------------- */

  /* States
  ------------------------------- */

  /* Modifiers
  ------------------------------- */

  /* States with modifiers
  ------------------------------- */

  /* Media queries
  ------------------------------- */
  @media (max-width: 839.98px) {
  }



  @media (max-width: 767.98px) {
  }
`

export const ModalFooterStyle = styled.div`
  /* Parent styles
  ------------------------------- */
  display: flex;

  /* Child element styles
  ------------------------------- */
  & > * {
    margin: 0;
  }

  /* States
  ------------------------------- */

  /* Modifiers
  ------------------------------- */

  /* States with modifiers
  ------------------------------- */

  /* Media queries
  ------------------------------- */
`

export const ModalCloseButtonStyle = styled.div`
  /* Parent styles
  ------------------------------- */
  top: 20px;
  right: 23px;
  position: absolute;
  width: 20px;
  height: 20px;
  cursor: pointer;
  opacity: 0;
  transition: all ${VARIABLES.TRANSITIONS.VERY_FAST} ease-in;
  transition-delay: ${VARIABLES.TRANSITIONS.VERY_FAST};

   /* Child element styles
  ------------------------------- */

  /* States
  ------------------------------- */

  /* Modifiers
  ------------------------------- */

  /* States with modifiers
  ------------------------------- */

  /* Media queries
  ------------------------------- */
  @media (max-width: 575.98px) {

  }

`
