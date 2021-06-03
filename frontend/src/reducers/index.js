import { combineReducers } from "redux";
import { routeHistoryRedux } from "./routeReducers";
import {
  userReduxList,
  userAuthRedux,
  Ticker,
  Price,
  Depth,
  Trades,
  Symbols,
  Token,
} from "./userReducers";

export const rootReducer = () => {
  return combineReducers({
    routeHistoryRedux,
    token: Token,
    ticker: Ticker,
    cur_price: Price,
    depth: Depth,
    trades: Trades,
    symbols: Symbols,
  });
};
