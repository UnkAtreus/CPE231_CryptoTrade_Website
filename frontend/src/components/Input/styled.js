import styled from 'styled-components'
import {
  default as VARIABLES
} from '../../themes/styles/variables'

export const InputStyle = styled.div`
  /* Parent styles
  ------------------------------- */
    font-size: ${VARIABLES.TYPOGRAPHYS.FONT_THEME.PARAGRAPH};
    margin-bottom: 8px;
    height: 50px;
    

  /* Child element styles
  ------------------------------- */
  input {
    color: ${VARIABLES.COLORS.WHITE};
    background-color: ${VARIABLES.COLORS.BACKGROUND_1};
    border: none;
    height: 32px;
    width: 100%;
    height: 100%;
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

  .prefix-container {
    
  }

  /* Modifiers
  ------------------------------- */

  /* Media queries
  ------------------------------- */
`

export const InputField = styled.div`
  border-radius: ${VARIABLES.BORDER_RADIUSES.REGULAR};
  background-color: ${VARIABLES.COLORS.BACKGROUND_1};
`;