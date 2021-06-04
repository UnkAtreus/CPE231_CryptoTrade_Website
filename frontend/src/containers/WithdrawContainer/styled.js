import styled from "styled-components";
import { default as VARIABLES } from "../../themes/styles/variables";
import { SHARDS } from "../../themes";
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
export const WithdrawStyled = styled.div`
  /* Parent styles
  ------------------------------- */

  /* Child element styles
  ------------------------------- */

  /* Modifiers
  ------------------------------- */

  /* Media queries
  ------------------------------- */
`;

export const Header = styled.div`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  width: 100%;
  height: 100%;
  z-index: 10;
  margin-bottom: 8px;
`;

export const SubHeader = styled.div`
  height: 64px;
  width: 100%;
  border-radius: ${VARIABLES.BORDER_RADIUSES.SMALL};
  background-color: ${VARIABLES.COLORS.BACKGROUND_2};
  padding: 16px;
  margin-bottom: 8px;
`;

export const WithdrawType = styled.div`
  height: 340px;
  width: 100%;
  border-radius: ${VARIABLES.BORDER_RADIUSES.SMALL};
  background-color: ${VARIABLES.COLORS.BACKGROUND_2};
  margin-bottom: 8px;
  margin-right: 8px;
  overflow: none;
`;

export const WithdrawTypeContainer = styled.div`
  display: flex;
  justify-content: space-between;

  .pic-overlay {
    width: 222px;
    height: 248px;
    filter: invert(22%) sepia(27%) saturate(914%) hue-rotate(202deg)
      brightness(89%) contrast(89%);
    background-blend-mode: overlay;
    border-radius: 0px 0px 16px 0px;
    background-size: 297px 297px;
    background-image: url(${SHARDS["bitcoin-overlay.svg"]});
    &.crypto {
      background-image: url(${SHARDS["bitcoin-overlay.svg"]});
    }

    &.fiat {
      background-image: url(${SHARDS["money-bag-overlay.svg"]});
    }
  }

  .pic-container {
    height: 292px;
    display: flex;
    align-items: flex-end;
  }

  .Input-container {
    padding: 32px 16px 32px 32px;
    width: 360px;
  }
`;

export const WithdrawDetail = styled.div`
  height: 340px;
  width: 512px;
  border-radius: ${VARIABLES.BORDER_RADIUSES.SMALL};
  background-color: ${VARIABLES.COLORS.BACKGROUND_2};
  padding: 16px;
  margin-bottom: 8px;
  .qr-container {
    width: 150px;
    height: 150px;
    border-radius: ${VARIABLES.BORDER_RADIUSES.SMALL};
    background-color: ${VARIABLES.COLORS.WHITE};
  }
`;

export const CoinDropdown = styled.div`
  margin-bottom: 8px;
`;

export const WithdrawHistory = styled.div`
  height: 296px;
  width: 100%;
  border-radius: ${VARIABLES.BORDER_RADIUSES.SMALL};
  background-color: ${VARIABLES.COLORS.BACKGROUND_2};
  padding: 24px;
  margin-bottom: 8px;
`;

export const PaymentSelected = styled.div`
  margin-bottom: 8px;
`;

export const HistoryContainer = styled.div`
  overflow: auto;
  height: 196px;
`;
