import styled from "styled-components";
import { default as VARIABLES } from "../../themes/styles/variables";
import { LOGOS } from "../../themes";
import { SHARDS } from "../../themes";

// Wrapper
// ============================================================
export const LandingStyled = styled.div`
  /* Parent styles
  ------------------------------- */
  padding-bottom: 8px;

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
  display: flex;
  justify-content: center;
  background-color: rgb(127 73 232);
  padding-bottom: 16px;
  background-position: center;
  background-size: cover;
  background-image: url(${SHARDS["wave-bg.svg"]});
  background-repeat: no-repeat;

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

export const StartTradingSection = styled.div`
  display: flex;
  justify-content: center;
  background-color: rgb(127 73 232);
  padding-bottom: 4rem;
  padding-top: 4rem;
`;
