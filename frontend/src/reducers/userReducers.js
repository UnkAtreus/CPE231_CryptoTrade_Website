import { ACTION_TYPES } from "actions";
import { ACTION_SAGA_TYPES } from "sagas";

const initialUserListState = {
  data: [],
};

const initialSymbols = {
  btcusdt: { symbol: "BTC/USDT", name: "Bitcoin" },
  adausdt: { symbol: "ADA/USDT", name: "Cardano" },
  ethusdt: { symbol: "ETH/USDT", name: "Ethereum" },
  dotusdt: { symbol: "DOT/USDT", name: "Polkadot" },
  bchusdt: { symbol: "BCH/USDT", name: "Bitcoin Cash" },
};
export const userReduxList = (state = initialUserListState, action) => {
  switch (action.type) {
    case ACTION_SAGA_TYPES.API_USER_LIST_RESPONSE:
      return action.payload;
    default:
      return state;
  }
};

const initialUserAuthState = {};

export const userAuthRedux = (state = initialUserAuthState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_USER_AUTH:
      return action.payload;
    default:
      return state;
  }
};

export const Ticker = (state = {}, action) => {
  switch (action.type) {
    case "SET_TICKER":
      return Object.assign({}, action.data);
    default:
      return state;
  }
};
export const Price = (state = {}, action) => {
  switch (action.type) {
    case "SET_CUR_PRICE":
      return Object.assign({}, action.data);
    default:
      return state;
  }
};

export const Depth = (state = {}, action) => {
  switch (action.type) {
    case "SET_DEPTH":
      return Object.assign({}, action.data);
    default:
      return state;
  }
};

export const Trades = (state = [], action) => {
  switch (action.type) {
    case "SET_TRADES":
      return action.data;
    default:
      return state;
  }
};

export const Symbols = (state = initialSymbols, action) => {
  switch (action.type) {
    case "SET_SYMBOLS":
      return action.data;
    default:
      return state;
  }
};

export const Token = (state = {}, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return action.data;
    default:
      return state;
  }
};
