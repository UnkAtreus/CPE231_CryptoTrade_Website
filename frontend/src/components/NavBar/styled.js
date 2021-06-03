import styled from "styled-components";
import { default as VARIABLES } from "../../themes/styles/variables";

// Wrapper
// ============================================================
export const NavBarStyle = styled.div`
  /* Parent styles
  ------------------------------- */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 64px;
  padding: 0 16px;
  background-color: ${VARIABLES.COLORS.BACKGROUND_3};

  /* Child element styles
  ------------------------------- */

  .nav-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  /* Modifiers
  ------------------------------- */

  /* Modifiers for single UI
  ------------------------------- */

  /* Media queries
  ------------------------------- */
`;
