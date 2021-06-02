import React from "react";
import { ChartStyle } from "./styled";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

export const Chart = (props) => {
  const SYMBOL = props.symbol ? props.symbol.toUpperCase() : "BTCUSDT";
  return (
    <React.Fragment>
      <ChartStyle>
        <TradingViewWidget
          symbol={"BINANCE:" + SYMBOL}
          theme={Themes.DARK}
          locale="en"
          interval="60"
          autosize
        />
      </ChartStyle>
    </React.Fragment>
  );
};
