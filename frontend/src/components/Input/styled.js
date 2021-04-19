import styled from 'styled-components'
import {
  default as VARIABLES
} from '../../themes/styles/variables'

export const InputStyle = styled.div`
  /* Parent styles
  ------------------------------- */
    font-size: ${VARIABLES.TYPOGRAPHYS.FONT_THEME.PARAGRAPH};
    margin-bottom: 8px;
    height: 100%;

  /* Child element styles
  ------------------------------- */
  input {
    color: ${VARIABLES.COLORS.WHITE};
    background-color: ${VARIABLES.COLORS.BACKGROUND_1};
    border: none;
    padding-left: 16px;
    padding-right: 16px;
    height: 32px;
    width: 100%;
    height: 100%;
    border-radius: ${VARIABLES.BORDER_RADIUSES.REGULAR};
    font-size: ${VARIABLES.TYPOGRAPHYS.FONT_THEME.LABEL};

    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: ${VARIABLES.COLORS.GRAY};
      opacity: 1; /* Firefox */
    }

    :-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: ${VARIABLES.COLORS.GRAY};
    }

    ::-ms-input-placeholder { /* Microsoft Edge */
      color: ${VARIABLES.COLORS.GRAY};
    }
  }

  /* Modifiers
  ------------------------------- */

  /* Media queries
  ------------------------------- */
`
