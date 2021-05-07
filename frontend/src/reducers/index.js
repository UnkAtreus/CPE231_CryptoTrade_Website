import { combineReducers } from "redux";
import { routeHistoryRedux } from "./routeReducers";
import {
  userReduxList,
  userAuthRedux,
  Ticker,
  Depth,
  Trades,
  Symbols,
} from "./userReducers";

export const rootReducer = () => {
  return combineReducers({
    routeHistoryRedux,
    ticker: Ticker,
    depth: Depth,
    trades: Trades,
    symbols: Symbols,
  });
};
