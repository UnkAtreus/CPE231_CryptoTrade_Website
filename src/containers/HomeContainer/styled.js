import styled from 'styled-components'
import {
  default as VARIABLES
} from '../../themes/styles/variables'
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
  grid-template-columns: 1fr minmax(253px, 320px) minmax(510px, 880px) minmax(253px, 320px) 1fr;
  grid-template-rows: minmax(64px, auto) 72px 320px 160px 256px auto 285px;
  grid-template-areas:
      "header header header header header"
      "left subHeader subHeader profile right"
      "left orderbook chart profile right"
      "left orderbook chart trades right"
      "left orderbook orderForm trades right"
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
    padding-top: 10px;
    padding-bottom: 10px;
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
    padding-top: 8px;
    padding-bottom: 8px;
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
    padding-left: 16px;
    padding-right: 16px;
    background-color: ${VARIABLES.COLORS.BACKGROUND_2};
    border-radius: ${VARIABLES.BORDER_RADIUSES.REGULAR};
    z-index: auto;
    position: relative;
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
