import styled from 'styled-components'
import { VARIABLES } from 'themes'

// Modifier (props)
// ============================================================

// Core
// ============================================================
export const LoadingStyle = styled.div`
  /* Parent styles
  ------------------------------- */
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -999;
  background-color: ${VARIABLES.COLORS.OVERLAY_1};
  width: 0;
  height: 0;
  opacity: 0;
  visibility: hidden;

  /* Child element styles
  ------------------------------- */

  /* States
  ------------------------------- */
  &.loading {
    opacity: 1;
    visibility: visible;
    z-index: ${VARIABLES.Z_INDEXS.LV_7};
    width: 100%;
    height: 100%;
  }

  /* Modifiers
  ------------------------------- */

  &.inside-element {
    position: absolute;
  }

  /* States with modifiers
  ------------------------------- */

  /* Media queries
  ------------------------------- */
`
