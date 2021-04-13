import styled from 'styled-components'
import {
  default as VARIABLES
} from '../../themes/styles/variables'

export const TabStyle = styled.div`
  /* Parent styles
  ------------------------------- */

  /* Child element styles
  ------------------------------- */

  /* Modifiers
  ------------------------------- */


  /* Media queries
  ------------------------------- */
`
export const TabHeader = styled.ul`
  /* Parent styles
  ------------------------------- */
  display: flex;
  background-color: ${VARIABLES.COLORS.BACKGROUND_3};
  height: 48px;
  border-radius: ${VARIABLES.BORDER_RADIUSES.SMALL} ${VARIABLES.BORDER_RADIUSES.SMALL} 0 0;
  align-items: center;

  /* Child element styles
  ------------------------------- */

  li {
    width: 128px;
    display: flex;
    justify-content: center;
    color: ${VARIABLES.COLORS.GRAY};
    font-size: ${VARIABLES.TYPOGRAPHYS.FONT_THEME.PARAGRAPH};
    height: 48px;
    align-items: center;
    &.active {
      background-color: ${VARIABLES.COLORS.BACKGROUND_2};
      border-radius: ${VARIABLES.BORDER_RADIUSES.SMALL} ${VARIABLES.BORDER_RADIUSES.SMALL} 0 0;
      color: ${VARIABLES.COLORS.WHITE};
    }
  }

  /* Modifiers
  ------------------------------- */


  /* Media queries
  ------------------------------- */
`
