import React, { useEffect, useState } from "react";
import ClassNames from "classnames";
import PropTypes, { symbol } from "prop-types";
import { ChartStyle } from "./styled";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

export const Chart = () => {
  return (
    <React.Fragment>
      <ChartStyle>
        <TradingViewWidget
          symbol="BINANCE:BTCUSDT"
          theme={Themes.DARK}
          locale="fr"
          interval="en"
          autosize
        />
      </ChartStyle>
    </React.Fragment>
  );
};
