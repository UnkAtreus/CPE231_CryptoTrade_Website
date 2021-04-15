import styled from 'styled-components'
import {
  default as VARIABLES
} from '../../themes/styles/variables'

// Wrapper
// ============================================================
export const ButtonStyle = styled.button`
  /* Parent styles
  ------------------------------- */
  transition: ${VARIABLES.TRANSITIONS.DEFAULT};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  border-radius: ${VARIABLES.BORDER_RADIUSES.REGULAR};
  cursor: pointer;
  border: none;

  /* Child element styles
  ------------------------------- */

  /* Modifiers
  ------------------------------- */

  /* Modifiers for single UI
  ------------------------------- */

  /* Media queries
  ------------------------------- */
`
