import styled from "styled-components";
import { default as VARIABLES } from "../../themes/styles/variables";
import { LOGOS } from "../../themes";
import { SHARDS } from "../../themes";

// Wrapper
// ============================================================
export const SettingStyled = styled.div`
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

export const BalanceContainer = styled.div`
  height: 432px;
  width: 100%;
  border-radius: ${VARIABLES.BORDER_RADIUSES.SMALL};
  background-color: ${VARIABLES.COLORS.BACKGROUND_2};
  padding: 48px 10%;
  margin-bottom: 8px;
`;

export const InfomationContainer = styled.div`
  height: 418px;
  width: 100%;
  border-radius: ${VARIABLES.BORDER_RADIUSES.SMALL};
  background-color: ${VARIABLES.COLORS.BACKGROUND_2};
  padding: 16px 64px;
  margin-bottom: 8px;
`;

export const FiatBalanceContainer = styled.div`
  width: 288px;
  margin-right: 72px;
`;

export const SpotBalanceContainer = styled.div`
  width: 288px;
`;

export const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  .pic-overlay {
    width: 300px;
    height: 300px;
    filter: invert(22%) sepia(27%) saturate(914%) hue-rotate(202deg)
      brightness(89%) contrast(89%);
    background-blend-mode: overlay;
    background-position: center;
    background-size: 256px 256px;
    background-image: url(${SHARDS["infomation-overlay.svg"]});
    background-repeat: no-repeat;
  }

  .pic-container {
    height: 402px;
    display: flex;
    align-items: center;
  }
`;

export const CryptoBalance = styled.div`
  width: 800px;

  .bitcoin {
    background: url("${LOGOS["bitcoin.png"]}") center center;
  }

  .bitcoin-cash {
    background: url("${LOGOS["bitcoin-cash.png"]}") center center;
  }

  .cardano {
    background: url("${LOGOS["cardano.png"]}") center center;
  }

  .ethereum {
    background: url("${LOGOS["ethereum.png"]}") center center;
  }

  .polkadot {
    background: url("${LOGOS["polkadot.png"]}") center center;
    background-repeat: no-repeat;
    background-color: #ffffff;
  }
`;

export const CardContainer = styled.div`
  background-color: ${VARIABLES.COLORS.BACKGROUND_2};
  border-radius: ${VARIABLES.BORDER_RADIUSES.SMALL};
  cursor: pointer;
  width: 324px;
  height: 160px;
  display: flex;
  align-items: center;
  padding: 16px 32px;
`;

export const HistorySection = styled.div`
  height: 512px;
  width: 100%;
  border-radius: ${VARIABLES.BORDER_RADIUSES.SMALL};
  background-color: ${VARIABLES.COLORS.BACKGROUND_2};
  padding: 24px;
  margin-bottom: 8px;
`;

export const HistoryContainer = styled.div`
  .history-container {
    height: 32px;
    border-radius: ${VARIABLES.BORDER_RADIUSES.REGULAR};
  }

  .even {
    background-color: ${VARIABLES.COLORS.BACKGROUND_5};
  }
`;

export const ActionBtn = styled.div`
  height: 24px;
  width: 24px;
  border-radius: ${VARIABLES.BORDER_RADIUSES.REGULAR};
  background-color: #f14763cf;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &.delete {
    background-color: #f14763cf;
  }
  &.edit {
    background-color: #ffde5acf;
  }
  &.add {
    background-color: #47f19fcf;
  }
`;

export const VertifyBtn = styled.div`
  height: 24px;
  width: 80px;
  padding: 8px 8px;
  border-radius: ${VARIABLES.BORDER_RADIUSES.REGULAR};
  background-color: #47f19f52;
  /* color: ${VARIABLES.COLORS.GREEN}; */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
