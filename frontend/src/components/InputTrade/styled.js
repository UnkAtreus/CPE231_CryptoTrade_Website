import styled from 'styled-components'
import {
  default as VARIABLES
} from '../../themes/styles/variables'

export const InputTradeStyle = styled.div`
  /* Parent styles
  ------------------------------- */
    background-color: ${VARIABLES.COLORS.BACKGROUND_1};
    font-size: ${VARIABLES.TYPOGRAPHYS.FONT_THEME.LABEL};
    height: 32px;
    border-radius: ${VARIABLES.BORDER_RADIUSES.REGULAR};
    display: flex;
    justify-content: center;
    margin-bottom: 8px;

  /* Child element styles
  ------------------------------- */
  input {
    color: ${VARIABLES.COLORS.WHITE};
    background-color: ${VARIABLES.COLORS.BACKGROUND_1};
    border: none;
    padding-left: 4px;
    padding-right: 4px;
    text-align: right;
    width: 100%;
    height: 100%;
  }

  /* Modifiers
  ------------------------------- */


  /* Media queries
  ------------------------------- */
`
