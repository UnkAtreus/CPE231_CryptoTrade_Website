import styled from 'styled-components'
import {
  default as VARIABLES
} from '../../themes/styles/variables'

export const RadioStyle = styled.div`
  /* Parent styles
  ------------------------------- */
 
  /* Child element styles
  ------------------------------- */

  /* Modifiers
  ------------------------------- */


  /* Media queries
  ------------------------------- */
`
export const RadioHeader = styled.div`
  /* Parent styles
  ------------------------------- */

  /* Child element styles
  ------------------------------- */

  /* Modifiers
  ------------------------------- */


  /* Media queries
  ------------------------------- */
`

export const RadioChildStyle = styled.div`
  /* Parent styles
  ------------------------------- */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 100%;
  align-items: center;
  background-color: ${VARIABLES.COLORS.BACKGROUND_1};
  border-radius: ${VARIABLES.BORDER_RADIUSES.REGULAR};
  cursor: pointer;

  &.active {
    background-color: ${VARIABLES.COLORS.PURPLE};
    color: ${VARIABLES.COLORS.WHITE};
  }

   

  /* Child element styles
  ------------------------------- */


  /* Modifiers
  ------------------------------- */


  /* Media queries
  ------------------------------- */
`
