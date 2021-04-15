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
export const HomeStyled = styled.div`
  /* Parent styles
  ------------------------------- */
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  background-color: ${VARIABLES.COLORS.BACKGROUND_1};
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr minmax(250px, 320px) minmax(510px, 880px) minmax(250px, 320px) 1fr;
  grid-template-rows: minmax(64px, auto) 112px 250px 228px 324px 285px;
  grid-template-areas:
      "header header header header header"
      "left subHeader subHeader profile right"
      "left orderbook chart profile right"
      "left orderbook chart trades right"
      "left orderbook orderForm trades right"
      "left orderHistory orderHistory orderHistory right";

  /* Child element styles
  ------------------------------- */

  /* Modifiers
  ------------------------------- */


  /* Media queries
  ------------------------------- */
`

export const SubHeader = styled.div`
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    height: 100%;
    width: 100%;
    background-color: ${VARIABLES.COLORS.BACKGROUND_2};
    border-radius: ${VARIABLES.BORDER_RADIUSES.SMALL};
    grid-area: subHeader / subHeader / subHeader / subHeader;
    font-size: 14px;
    color: rgb(255, 255, 255);
`;

export const Header = styled.div`
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    width: 100%;
    height: 100%;
    grid-area: header / header / header / header;
    z-index: 10;
`;

export const Profile = styled.div`
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    width: 100%;
    height: 100%;
    background-color: ${VARIABLES.COLORS.BACKGROUND_2};
    border-radius: ${VARIABLES.BORDER_RADIUSES.REGULAR};
    grid-area: profile / profile / profile / profile;
    
    .profile-container {
        padding: 16px;
    }

    .bitcoin {
        background: url('${LOGOS['bitcoin.png']}') center center;
    }

    .bitcoin-cash {
        background: url('${LOGOS['bitcoin-cash.png']}') center center;
    }

    .cardano {
        background: url('${LOGOS['cardano.png']}') center center;
    }

    .ethereum {
        background: url('${LOGOS['ethereum.png']}') center center;
    }

    .polkadot {
        background: url('${LOGOS['polkadot.png']}') center center;
        background-repeat: no-repeat;
        background-color: #ffffff;
    }
`;

export const OrderBook = styled.div`
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    width: 100%;
    height: 100%;
    background-color: ${VARIABLES.COLORS.BACKGROUND_2};
    border-radius: ${VARIABLES.BORDER_RADIUSES.REGULAR};
    grid-area: orderbook / orderbook / orderbook / orderbook;
    position: relative;

    .orderbook-container {
        padding: 16px;
    }
`;

export const OrderForm = styled.div`
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    width: 100%;
    height: 100%;
    grid-area: orderForm / orderForm / orderForm / orderForm;
    background-color: ${VARIABLES.COLORS.BACKGROUND_2};
    border-radius: ${VARIABLES.BORDER_RADIUSES.REGULAR};

    .limit-container {
        padding: 16px;
    }
    .market-container {
        padding: 16px;
    }
`;

export const Chartstyle = styled.div`
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    width: 100%;
    height: 100%;
    background-color: ${VARIABLES.COLORS.BACKGROUND_2};
    border-radius: ${VARIABLES.BORDER_RADIUSES.REGULAR};
    grid-area: chart / chart / chart / chart;
    position: relative;
`;

export const Trades = styled.div`
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    width: 100%;
    height: 100%;
    grid-area: trades / trades / trades / trades;
    background-color: ${VARIABLES.COLORS.BACKGROUND_2};
    border-radius: ${VARIABLES.BORDER_RADIUSES.REGULAR};
    z-index: auto;
    position: relative;

    .trades-container {
        padding: 16px;
    }

    .trades-price-container {
        position: relative;
        height: 458px;
        overflow: auto;
        will-change: transform;
        direction: ltr;
    }
`;

export const OrderHistory = styled.div`
    box-sizing: border-box;
    margin: 0px;
    min-width: 0px;
    display: flex;
    height: 100%;
    width: 100%;
    background-color: ${VARIABLES.COLORS.BACKGROUND_2};
    border-radius: ${VARIABLES.BORDER_RADIUSES.REGULAR};
    grid-area: orderHistory / orderHistory / orderHistory / orderHistory;
    font-size: 14px;
    color: rgb(255, 255, 255);
    flex-direction: column;
    overflow: hidden;
`;
