import styled from 'styled-components'
import {
    default as VARIABLES
} from '../../themes/styles/variables'
import { LOGOS } from "../../themes";
// import {
//   default as TYPOGRAPHYS
// } from '../../themes/styles/variables/typographys'
// import {
//   default as MIXINS
// } from '../../themes/styles/helpers/mixins'
// import {
//   default as UTILITIES
// } from '../../themes/styles/helpers/utilities'

// Wrapper
// ============================================================
export const RegisterStyled = styled.div`
  /* Parent styles
  ------------------------------- */

  /* Child element styles
  ------------------------------- */

  /* Modifiers
  ------------------------------- */
  .inline-flex {
      display: inline-flex;
      column-gap: 16px;
      width: 100%;
  }

  /* Media queries
  ------------------------------- */
`

export const Header = styled.div`
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    width: 100%;
    height: 100%;
    z-index: 10;
`;

export const RegisterForm = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 8px 0;
`;

export const RegisterFormContainer = styled.div`
    display: block;
    background-color: ${VARIABLES.COLORS.BACKGROUND_2};
    padding: 24px;
    border-radius: ${VARIABLES.BORDER_RADIUSES.REGULAR};
    width: 416px;
`;

export const BirthdayInput = styled.div`
`;