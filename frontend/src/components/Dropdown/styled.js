import styled from 'styled-components'
import {
  default as VARIABLES
} from '../../themes/styles/variables'

export const DropdownStyle = styled.div`
  /* Parent styles
  ------------------------------- */
    font-size: ${VARIABLES.TYPOGRAPHYS.FONT_THEME.PARAGRAPH};
    margin-bottom: 8px;
    height: 100%;
    width: 100%;
    position:relative;
    cursor: pointer;

  /* Child element styles
  ------------------------------- */
  .dropdown-header {
    color: ${VARIABLES.COLORS.WHITE};
    background-color: ${VARIABLES.COLORS.BACKGROUND_1};
    border: none;
    height: 32px;
    width: 100%;
    height: 100%;
    font-size: ${VARIABLES.TYPOGRAPHYS.FONT_THEME.LABEL};
    display: flex;
    align-items: center;
  }

  /* Modifiers
  ------------------------------- */

  /* Media queries
  ------------------------------- */
`

export const DropdownField = styled.div`
  display: none;
  border-radius: ${VARIABLES.BORDER_RADIUSES.SMALL};
  background-color: ${VARIABLES.COLORS.BACKGROUND_4};
  position: absolute;
  width: 100%;
  height: 196px;
  
  top: 0;
  z-index: 0;
  padding-top: 36px;
  padding-left: 16px; 
  padding-right: 8px; 
  padding-bottom: 8px;
  scroll-margin: 50px 0 0 50px;

  &.open {
    display: block;
  }

  .dropdown-item {
    width: 100%;
    cursor: pointer;
  }

  .dropdown-item:hover {
    width: 100%;
    cursor: pointer;
  }
`;

export const DropdownHeader = styled.div`
  border-radius: ${VARIABLES.BORDER_RADIUSES.REGULAR};
  background-color: ${VARIABLES.COLORS.BACKGROUND_1};
  position: relative;
  z-index: 1;
`;

export const DropdownContent = styled.div`
overflow: auto;
height: 148px;
`;