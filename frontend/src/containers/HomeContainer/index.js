import React, { useState, useEffect, useRef } from "react";
import {
  HomeStyled,
  Header,
  SubHeader,
  Profile,
  OrderBook,
  OrderForm,
  Chartstyle,
  Trades,
  OrderHistory,
} from "./styled";
import { NavBar } from "components/NavBar";
import { InputTrade } from "components/InputTrade";
import { ValueStep } from "components/ValueStep";
import { Chart } from "components/Chart";
import { Tab } from "components/Tab";
import { TabWithLink } from "components/TabWithLink";
import { TabPane } from "components/TabPane";
import { Button } from "components/Button";
import { marketController } from "apiService";
import ClassNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import BigNumber from "bignumber.js";
import { isEqualType } from "graphql";

const constants = {
  lastUpdateId: 10299107955,
  bids: [
    ["48479.26000000", "18.17293000"],
    ["48479.25000000", "0.00413400"],
  ],
  asks: [
    ["48479.27000000", "4.39329500"],
    ["48480.09000000", "0.10000000"],
  ],
};

const HomeContainer = (props) => {
  const [price, setPrice] = useState(0);
  const [priceSell, setPriceSell] = useState(0);
  const [priceBuy, setPriceBuy] = useState(0);
  const [isUpPrice, setIsUpPrice] = useState(true);
  const [streams] = useState(["@ticker", "@depth20", "@trade"]);
  const [isLoading, setIsLoading] = useState(true);
  const [cryptoSign, setCryptoSign] = useState("Bitcoin");
  const [cryptoSymbol, setCryptoSymbol] = useState("BTC");
  const [valueAmountSell, setValueAmountSell] = useState(0);
  const [valueTotalSell, setValueTotalSell] = useState(0);
  const [valueAmountBuy, setValueAmountBuy] = useState(0);
  const [valueTotalBuy, setValueTotalBuy] = useState(0);
  const [valueAmountBuyMarket, setValueAmountBuyMarket] = useState(0);
  const [valueTotalBuyMarket, setValueTotalBuyMarket] = useState(0);
  const [valueAmountSellMarket, setValueAmountSellMarket] = useState(0);
  const [valueTotalSellMarket, setValueTotalSellMarket] = useState(0);

  const MOCK_USER_CURRENCY = {
    btc: 0.00000091,
    ada: 129.3349,
    eth: 0.00138437,
    bch: 0,
    dot: 0,
    usdt: 49657.01,
  };

  const FORMAT_DECIMAL = {
    prefix: "",
    decimalSeparator: ".",
    groupSeparator: "",
    groupSize: 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: " ",
    fractionGroupSize: 0,
    suffix: "",
  };

  const SYMBOL = props.match.params.symbol
    ? props.match.params.symbol.toLowerCase()
    : "btcusdt";

  const hasCrypto = (symbol) => {
    switch (symbol) {
      case "btcusdt":
        setCryptoSign("Bitcoin");
        setCryptoSymbol("BTC");
        break;
      case "adausdt":
        setCryptoSign("Cardano");
        setCryptoSymbol("ADA");
        break;
      case "ethusdt":
        setCryptoSign("Ethereum");
        setCryptoSymbol("ETH");
        break;
      case "dotusdt":
        setCryptoSign("Polkadot");
        setCryptoSymbol("DOT");
        break;
      case "bchusdt":
        setCryptoSign("Bitcoin Cash");
        setCryptoSymbol("BCH");
        break;
      default:
        setCryptoSign("Bitcoin");
        setCryptoSymbol("BTC");
        break;
    }
  };

  const TRADES_COUNT = 32;

  const isEqual = (l, r) => {
    if (l.ticker.c !== r.ticker.c)
      if (l.ticker.c >= r.ticker.c) setIsUpPrice(true);
      else setIsUpPrice(false);
  };

  const dispatch = useDispatch();
  const arg = useSelector((state) => state, isEqual);

  const GetPrice = async () => {
    const crypto_price = await marketController().getPrice(
      "symbol=" + SYMBOL.toUpperCase()
    );
    dispatch({
      type: "SET_CUR_PRICE",
      data: crypto_price,
    });
    setPrice(BigNumber(crypto_price.price).toFormat(2, FORMAT_DECIMAL));
    setPriceSell(BigNumber(crypto_price.price).toFormat(2, FORMAT_DECIMAL));
    setPriceBuy(BigNumber(crypto_price.price).toFormat(2, FORMAT_DECIMAL));
    setIsLoading(false);
  };

  const _connectSocketStreams = (streams) => {
    streams = streams.join("/");
    let connection = btoa(streams);
    connection = new WebSocket(
      `wss://stream.binance.com:9443/stream?streams=${streams}`
    );
    connection.onmessage = (evt) => {
      let eventData = JSON.parse(evt.data);

      if (eventData.stream.endsWith("@ticker")) {
        dispatch({
          type: "SET_TICKER",
          data: eventData.data,
        });
      }
      if (eventData.stream.endsWith("@depth20")) {
        dispatch({
          type: "SET_DEPTH",
          data: eventData.data,
        });
      }
      if (eventData.stream.endsWith("@trade")) {
        let trades = arg.trades;
        trades.push(eventData.data);
        trades = trades.slice(-1 * TRADES_COUNT);
        dispatch({
          type: "SET_TRADES",
          data: trades,
        });
      }
    };
    connection.onerror = (evt) => {
      console.error(evt);
    };
  };

  const _disconnectSocketStreams = (streams) => {
    streams = streams.join("/");
    let connection = btoa(streams);
    if (connection.readyState === WebSocket.OPEN) {
      connection.close();
    }
  };

  const calPriceSell = (fun, data) => {
    switch (fun) {
      case "amount":
        setValueTotalSell(
          BigNumber(data * priceSell).toFormat(2, FORMAT_DECIMAL)
        );
        break;
      case "total":
        setValueAmountSell(
          BigNumber(data / priceSell).toFormat(2, FORMAT_DECIMAL)
        );
        break;
      case "cryptoPrice":
        setValueTotalSell(
          BigNumber(valueAmountSell * priceSell).toFormat(2, FORMAT_DECIMAL)
        );
        break;

      case "step":
        setValueAmountSell(
          BigNumber(
            MOCK_USER_CURRENCY[cryptoSymbol.toLowerCase()] * 0.25 * data
          ).toFormat(2, FORMAT_DECIMAL)
        );
        setValueTotalSell(
          BigNumber(
            MOCK_USER_CURRENCY[cryptoSymbol.toLowerCase()] *
              0.25 *
              data *
              priceSell
          ).toFormat(2, FORMAT_DECIMAL)
        );
        break;

      default:
        break;
    }
  };

  const calPriceBuy = (fun, data) => {
    switch (fun) {
      case "amount":
        setValueTotalBuy(
          BigNumber(data * priceBuy).toFormat(2, FORMAT_DECIMAL)
        );
        break;
      case "total":
        setValueAmountBuy(
          BigNumber(data / priceBuy).toFormat(2, FORMAT_DECIMAL)
        );
        break;
      case "cryptoPrice":
        setValueTotalBuy(
          BigNumber(valueAmountBuy * priceBuy).toFormat(2, FORMAT_DECIMAL)
        );
        break;
      case "step":
        setValueAmountBuy(
          BigNumber(MOCK_USER_CURRENCY["usdt"] * 0.25 * data).toFormat(
            2,
            FORMAT_DECIMAL
          )
        );
        setValueTotalBuy(
          BigNumber(
            MOCK_USER_CURRENCY["usdt"] * 0.25 * data * priceBuy
          ).toFormat(2, FORMAT_DECIMAL)
        );
        break;

      default:
        break;
    }
  };

  const calPriceMarket = (fun, data) => {
    switch (fun) {
      case "amountbuy":
        setValueTotalBuyMarket(
          BigNumber(data / price).toFormat(2, FORMAT_DECIMAL)
        );
        break;
      case "amountsell":
        setValueAmountSellMarket(
          BigNumber(data / price).toFormat(2, FORMAT_DECIMAL)
        );
        break;
      case "stepbuy":
        setValueAmountBuyMarket(
          BigNumber(MOCK_USER_CURRENCY["usdt"] * 0.25 * data).toFormat(
            2,
            FORMAT_DECIMAL
          )
        );
        break;
      case "stepsell":
        setValueAmountSellMarket(
          BigNumber(
            MOCK_USER_CURRENCY[cryptoSymbol.toLowerCase()] * 0.25 * data
          ).toFormat(2, FORMAT_DECIMAL)
        );
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    _connectSocketStreams(streams.map((i) => `${SYMBOL}${i}`));
    GetPrice();
    hasCrypto(SYMBOL);
    console.log(props.match.params.symbol);
    return () => {
      _disconnectSocketStreams(this.streams.map((i) => `${SYMBOL}${i}`));
    };
  }, []);

  const convertTime = (date) => {
    return Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date);
  };

  return (
    <HomeStyled>
      {!isLoading && (
        <>
          <Header name="header">
            <NavBar></NavBar>
          </Header>
          <OrderBook name="orderbook">
            <div className="orderbook-container">
              <div className="content-column mgb-16">
                <div className="paragraph mgb-8">Orderbook</div>
                <div className="content-row space-between mgb-2">
                  <div
                    className="label gray align-items-start"
                    style={{ minWidth: "70px" }}
                  >
                    Price(USDT)
                  </div>
                  <div
                    className="label gray align-items-end "
                    style={{ minWidth: "75px" }}
                  >
                    Amount({cryptoSymbol})
                  </div>
                  <div
                    className="label gray align-items-end text-right"
                    style={{ minWidth: "60px" }}
                  >
                    Total
                  </div>
                </div>

                <div className="content-column mgb-16">
                  {arg.depth.bids &&
                    arg.depth.bids.map((data, index) => {
                      if (index < 17) {
                        return (
                          <div
                            className="content-row space-between mgb-2"
                            key={index}
                          >
                            <div
                              className="label red align-items-start"
                              style={{ minWidth: "70px" }}
                            >
                              {BigNumber(data[0]).toFormat(2)}
                            </div>
                            <div
                              className="label white align-items-end text-right"
                              style={{ minWidth: "75px" }}
                            >
                              {BigNumber(data[1]).toFormat(6)}
                            </div>
                            <div
                              className="label white align-items-end text-right"
                              style={{ minWidth: "60px" }}
                            >
                              {BigNumber(data[0] * data[1]).toFormat(2)}
                            </div>
                          </div>
                        );
                      } else return null;
                    })}
                </div>

                <div className="content-row align-items-center mgb-16">
                  <div
                    className={ClassNames(
                      "paragraph mgr-16",
                      isUpPrice ? "green" : "red"
                    )}
                  >
                    {new BigNumber(arg.ticker.c).toFormat(2)}
                  </div>
                  <div className="label gray">
                    ${new BigNumber(arg.ticker.c).toFormat(2)}
                  </div>
                </div>

                <div className="content-column mgb-16">
                  {arg.depth.asks &&
                    arg.depth.asks.map((data, index) => {
                      if (index < 17)
                        return (
                          <div
                            className="content-row space-between mgb-2"
                            key={index}
                          >
                            <div
                              className="label green align-items-start"
                              style={{ minWidth: "70px" }}
                            >
                              {BigNumber(data[0]).toFormat(2)}
                            </div>
                            <div
                              className="label white align-items-end text-right"
                              style={{ minWidth: "75px" }}
                            >
                              {BigNumber(data[1]).toFormat(6)}
                            </div>
                            <div
                              className="label white align-items-end text-right"
                              style={{ minWidth: "60px" }}
                            >
                              {BigNumber(data[0] * data[1]).toFormat(2)}
                            </div>
                          </div>
                        );
                      else return null;
                    })}
                </div>
              </div>
            </div>
          </OrderBook>
          <Chartstyle name="chart" id="chart">
            <Chart symbol={SYMBOL} />
          </Chartstyle>
          <SubHeader name="subHeader">
            <TabWithLink active={cryptoSign}>
              <TabPane name="Bitcoin" key="1" link="/trades/btcusdt">
                <div className="subHeader-container">
                  <div
                    className="content-row"
                    style={{ alignItems: "flex-end" }}
                  >
                    <div className="content-column mgr-32">
                      <div className="paragraph white">
                        {arg.symbols[SYMBOL].symbol}
                      </div>
                      <div className="label gray">
                        {arg.symbols[SYMBOL].name}
                      </div>
                    </div>
                    <div
                      className="content-column mgr-32"
                      style={{ minWidth: "96px" }}
                    >
                      <div
                        className={ClassNames(
                          "paragraph ",
                          isUpPrice ? "green" : "red"
                        )}
                      >
                        {new BigNumber(arg.ticker.c).toFormat(2)}
                      </div>
                      <div className="label gray">
                        $ {new BigNumber(arg.ticker.c).toFormat(2)}
                      </div>
                    </div>
                    <div
                      className="content-column mgr-16"
                      style={{ minWidth: "96px" }}
                    >
                      <div className="label gray">24h Change</div>
                      <div className="content-row">
                        <div
                          className={ClassNames(
                            "label mgr-4",
                            arg.ticker.p > 0 ? "green" : "red"
                          )}
                        >
                          {new BigNumber(arg.ticker.p).toFormat(2)}
                        </div>
                        <div
                          className={ClassNames(
                            "label",
                            arg.ticker.P > 0 ? "green" : "red"
                          )}
                        >
                          {new BigNumber(arg.ticker.P).toFormat(2)}%
                        </div>
                      </div>
                    </div>
                    <div
                      className="content-column mgr-16"
                      style={{ minWidth: "64px" }}
                    >
                      <div className="label gray">24h High</div>
                      <div className="label white">
                        {new BigNumber(arg.ticker.h).toFormat(2)}
                      </div>
                    </div>
                    <div
                      className="content-column mgr-16"
                      style={{ minWidth: "64px" }}
                    >
                      <div className="label gray">24h Low</div>
                      <div className="label white">
                        {new BigNumber(arg.ticker.l).toFormat(2)}
                      </div>
                    </div>
                    <div
                      className="content-column mgr-16"
                      style={{ minWidth: "64px" }}
                    >
                      <div className="label gray">24h Volume(BTC)</div>
                      <div className="label white">
                        {new BigNumber(arg.ticker.v).toFormat(2)}
                      </div>
                    </div>
                    <div className="content-column mgr-16">
                      <div className="label gray">24h Volume(USDT)</div>
                      <div className="label white">
                        {new BigNumber(arg.ticker.q).toFormat(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane name="Cardano" key="2" link="/trades/adausdt">
                <div className="subHeader-container">
                  <div
                    className="content-row"
                    style={{ alignItems: "flex-end" }}
                  >
                    <div className="content-column mgr-32">
                      <div className="paragraph white">
                        {arg.symbols[SYMBOL].symbol}
                      </div>
                      <div className="label gray">
                        {arg.symbols[SYMBOL].name}
                      </div>
                    </div>
                    <div
                      className="content-column mgr-32"
                      style={{ minWidth: "96px" }}
                    >
                      <div
                        className={ClassNames(
                          "paragraph ",
                          isUpPrice ? "green" : "red"
                        )}
                      >
                        {new BigNumber(arg.ticker.c).toFormat(2)}
                      </div>
                      <div className="label gray">
                        $ {new BigNumber(arg.ticker.c).toFormat(2)}
                      </div>
                    </div>
                    <div
                      className="content-column mgr-16"
                      style={{ minWidth: "96px" }}
                    >
                      <div className="label gray">24h Change</div>
                      <div className="content-row">
                        <div
                          className={ClassNames(
                            "label mgr-4",
                            arg.ticker.p > 0 ? "green" : "red"
                          )}
                        >
                          {new BigNumber(arg.ticker.p).toFormat(2)}
                        </div>
                        <div
                          className={ClassNames(
                            "label",
                            arg.ticker.P > 0 ? "green" : "red"
                          )}
                        >
                          {new BigNumber(arg.ticker.P).toFormat(2)}%
                        </div>
                      </div>
                    </div>
                    <div
                      className="content-column mgr-16"
                      style={{ minWidth: "64px" }}
                    >
                      <div className="label gray">24h High</div>
                      <div className="label white">
                        {new BigNumber(arg.ticker.h).toFormat(2)}
                      </div>
                    </div>
                    <div
                      className="content-column mgr-16"
                      style={{ minWidth: "64px" }}
                    >
                      <div className="label gray">24h Low</div>
                      <div className="label white">
                        {new BigNumber(arg.ticker.l).toFormat(2)}
                      </div>
                    </div>
                    <div
                      className="content-column mgr-16"
                      style={{ minWidth: "64px" }}
                    >
                      <div className="label gray">24h Volume(ADA)</div>
                      <div className="label white">
                        {new BigNumber(arg.ticker.v).toFormat(2)}
                      </div>
                    </div>
                    <div className="content-column mgr-16">
                      <div className="label gray">24h Volume(USDT)</div>
                      <div className="label white">
                        {new BigNumber(arg.ticker.q).toFormat(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane name="Ethereum" key="3" link="/trades/ethusdt">
                <div className="subHeader-container">
                  <div
                    className="content-row"
                    style={{ alignItems: "flex-end" }}
                  >
                    <div className="content-column mgr-32">
                      <div className="paragraph white">
                        {arg.symbols[SYMBOL].symbol}
                      </div>
                      <div className="label gray">
                        {arg.symbols[SYMBOL].name}
                      </div>
                    </div>
                    <div
                      className="content-column mgr-32"
                      style={{ minWidth: "96px" }}
                    >
                      <div
                        className={ClassNames(
                          "paragraph ",
                          isUpPrice ? "green" : "red"
                        )}
                      >
                        {new BigNumber(arg.ticker.c).toFormat(2)}
                      </div>
                      <div className="label gray">
                        $ {new BigNumber(arg.ticker.c).toFormat(2)}
                      </div>
                    </div>
                    <div
                      className="content-column mgr-16"
                      style={{ minWidth: "96px" }}
                    >
                      <div className="label gray">24h Change</div>
                      <div className="content-row">
                        <div
                          className={ClassNames(
                            "label mgr-4",
                            arg.ticker.p > 0 ? "green" : "red"
                          )}
                        >
                          {new BigNumber(arg.ticker.p).toFormat(2)}
                        </div>
                        <div
                          className={ClassNames(
                            "label",
                            arg.ticker.P > 0 ? "green" : "red"
                          )}
                        >
                          {new BigNumber(arg.ticker.P).toFormat(2)}%
                        </div>
                      </div>
                    </div>
                    <div
                      className="content-column mgr-16"
                      style={{ minWidth: "64px" }}
                    >
                      <div className="label gray">24h High</div>
                      <div className="label white">
                        {new BigNumber(arg.ticker.h).toFormat(2)}
                      </div>
                    </div>
                    <div
                      className="content-column mgr-16"
                      style={{ minWidth: "64px" }}
                    >
                      <div className="label gray">24h Low</div>
                      <div className="label white">
                        {new BigNumber(arg.ticker.l).toFormat(2)}
                      </div>
                    </div>
                    <div
                      className="content-column mgr-16"
                      style={{ minWidth: "64px" }}
                    >
                      <div className="label gray">24h Volume(ETH)</div>
                      <div className="label white">
                        {new BigNumber(arg.ticker.v).toFormat(2)}
                      </div>
                    </div>
                    <div className="content-column mgr-16">
                      <div className="label gray">24h Volume(USDT)</div>
                      <div className="label white">
                        {new BigNumber(arg.ticker.q).toFormat(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane name="Bitcoin Cash" key="4" link="/trades/bchusdt">
                <div className="subHeader-container">
                  <div
                    className="content-row"
                    style={{ alignItems: "flex-end" }}
                  >
                    <div className="content-column mgr-32">
                      <div className="paragraph white">
                        {arg.symbols[SYMBOL].symbol}
                      </div>
                      <div className="label gray">
                        {arg.symbols[SYMBOL].name}
                      </div>
                    </div>
                    <div
                      className="content-column mgr-32"
                      style={{ minWidth: "96px" }}
                    >
                      <div
                        className={ClassNames(
                          "paragraph ",
                          isUpPrice ? "green" : "red"
                        )}
                      >
                        {new BigNumber(arg.ticker.c).toFormat(2)}
                      </div>
                      <div className="label gray">
                        $ {new BigNumber(arg.ticker.c).toFormat(2)}
                      </div>
                    </div>
                    <div
                      className="content-column mgr-16"
                      style={{ minWidth: "96px" }}
                    >
                      <div className="label gray">24h Change</div>
                      <div className="content-row">
                        <div
                          className={ClassNames(
                            "label mgr-4",
                            arg.ticker.p > 0 ? "green" : "red"
                          )}
                        >
                          {new BigNumber(arg.ticker.p).toFormat(2)}
                        </div>
                        <div
                          className={ClassNames(
                            "label",
                            arg.ticker.P > 0 ? "green" : "red"
                          )}
                        >
                          {new BigNumber(arg.ticker.P).toFormat(2)}%
                        </div>
                      </div>
                    </div>
                    <div
                      className="content-column mgr-16"
                      style={{ minWidth: "64px" }}
                    >
                      <div className="label gray">24h High</div>
                      <div className="label white">
                        {new BigNumber(arg.ticker.h).toFormat(2)}
                      </div>
                    </div>
                    <div
                      className="content-column mgr-16"
                      style={{ minWidth: "64px" }}
                    >
                      <div className="label gray">24h Low</div>
                      <div className="label white">
                        {new BigNumber(arg.ticker.l).toFormat(2)}
                      </div>
                    </div>
                    <div
                      className="content-column mgr-16"
                      style={{ minWidth: "64px" }}
                    >
                      <div className="label gray">24h Volume(BCH)</div>
                      <div className="label white">
                        {new BigNumber(arg.ticker.v).toFormat(2)}
                      </div>
                    </div>
                    <div className="content-column mgr-16">
                      <div className="label gray">24h Volume(USDT)</div>
                      <div className="label white">
                        {new BigNumber(arg.ticker.q).toFormat(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane name="Polkadot" key="5" link="/trades/dotusdt">
                <div className="subHeader-container">
                  <div
                    className="content-row"
                    style={{ alignItems: "flex-end" }}
                  >
                    <div className="content-column mgr-32">
                      <div className="paragraph white">
                        {arg.symbols[SYMBOL].symbol}
                      </div>
                      <div className="label gray">
                        {arg.symbols[SYMBOL].name}
                      </div>
                    </div>
                    <div
                      className="content-column mgr-32"
                      style={{ minWidth: "96px" }}
                    >
                      <div
                        className={ClassNames(
                          "paragraph ",
                          isUpPrice ? "green" : "red"
                        )}
                      >
                        {new BigNumber(arg.ticker.c).toFormat(2)}
                      </div>
                      <div className="label gray">
                        $ {new BigNumber(arg.ticker.c).toFormat(2)}
                      </div>
                    </div>
                    <div
                      className="content-column mgr-16"
                      style={{ minWidth: "96px" }}
                    >
                      <div className="label gray">24h Change</div>
                      <div className="content-row">
                        <div
                          className={ClassNames(
                            "label mgr-4",
                            arg.ticker.p > 0 ? "green" : "red"
                          )}
                        >
                          {new BigNumber(arg.ticker.p).toFormat(2)}
                        </div>
                        <div
                          className={ClassNames(
                            "label",
                            arg.ticker.P > 0 ? "green" : "red"
                          )}
                        >
                          {new BigNumber(arg.ticker.P).toFormat(2)}%
                        </div>
                      </div>
                    </div>
                    <div
                      className="content-column mgr-16"
                      style={{ minWidth: "64px" }}
                    >
                      <div className="label gray">24h High</div>
                      <div className="label white">
                        {new BigNumber(arg.ticker.h).toFormat(2)}
                      </div>
                    </div>
                    <div
                      className="content-column mgr-16"
                      style={{ minWidth: "64px" }}
                    >
                      <div className="label gray">24h Low</div>
                      <div className="label white">
                        {new BigNumber(arg.ticker.l).toFormat(2)}
                      </div>
                    </div>
                    <div
                      className="content-column mgr-16"
                      style={{ minWidth: "64px" }}
                    >
                      <div className="label gray">24h Volume(DOT)</div>
                      <div className="label white">
                        {new BigNumber(arg.ticker.v).toFormat(2)}
                      </div>
                    </div>
                    <div className="content-column mgr-16">
                      <div className="label gray">24h Volume(USDT)</div>
                      <div className="label white">
                        {new BigNumber(arg.ticker.q).toFormat(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </TabPane>
            </TabWithLink>
          </SubHeader>
          <OrderForm name="orderForm">
            <Tab active="Limit">
              <TabPane name="Limit" key="1">
                <div className="limit-container">
                  <div className="content-row space-between">
                    <div
                      className="content-column mgr-16"
                      style={{ marginRight: "7%", flex: "1 1 0%" }}
                    >
                      <div className="content-row space-between mgb-2">
                        <div className="title white">Buy {cryptoSymbol}</div>
                        <div className="content-row">
                          <div className="label gray">
                            {BigNumber(MOCK_USER_CURRENCY["usdt"]).toFormat(
                              FORMAT_DECIMAL
                            )}
                          </div>
                          <div className="label gray mgl-8">USDT</div>
                        </div>
                      </div>

                      <InputTrade
                        prefix="Price"
                        suffix="USDT"
                        value={BigNumber(arg.cur_price.price).toFormat(
                          2,
                          FORMAT_DECIMAL
                        )}
                        onChange={(e) => {
                          setPriceBuy(e);
                          calPriceBuy("cryptoPrice", e);
                        }}
                      />
                      <InputTrade
                        prefix="Amount"
                        suffix={cryptoSymbol}
                        value={valueAmountBuy}
                        onChange={(e) => {
                          setValueAmountBuy(e);
                          calPriceBuy("amount", e);
                        }}
                      />
                      <ValueStep value={(e) => calPriceBuy("step", e)} />
                      <InputTrade
                        prefix="Total"
                        suffix="USDT"
                        value={valueTotalBuy}
                        onChange={(e) => {
                          setValueTotalBuy(e);
                          calPriceBuy("total", e);
                        }}
                      />

                      <Button label="Buy BTC" color="green" />
                    </div>

                    <div className="content-column" style={{ flex: "1 1 0%" }}>
                      <div className="content-row space-between mgb-2">
                        <div className="title white">Sell {cryptoSymbol}</div>
                        <div className="content-row">
                          <div className="label gray">
                            {BigNumber(
                              MOCK_USER_CURRENCY[cryptoSymbol.toLowerCase()]
                            ).toFormat(FORMAT_DECIMAL)}
                          </div>
                          <div className="label gray mgl-8">{cryptoSymbol}</div>
                        </div>
                      </div>
                      <InputTrade
                        prefix="Price"
                        suffix="USDT"
                        value={BigNumber(arg.cur_price.price).toFormat(
                          2,
                          FORMAT_DECIMAL
                        )}
                        onChange={(e) => {
                          setPriceSell(e);
                          calPriceSell("cryptoPrice", e);
                        }}
                      />
                      <InputTrade
                        prefix="Amount"
                        suffix={cryptoSymbol}
                        value={valueAmountSell}
                        onChange={(e) => {
                          setValueAmountSell(e);
                          calPriceSell("amount", e);
                        }}
                      />
                      <ValueStep value={(e) => calPriceSell("step", e)} />
                      <InputTrade
                        prefix="Total"
                        suffix="USDT"
                        value={valueTotalSell}
                        onChange={(e) => {
                          setValueTotalSell(e);
                          calPriceSell("total", e);
                        }}
                      />
                      <Button label="Sell BTC" color="red" />
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane name="Market" key="2">
                <div className="market-container">
                  <div className="content-row space-between">
                    <div
                      className="content-column mgr-16"
                      style={{ marginRight: "7%", flex: "1 1 0%" }}
                    >
                      <div className="content-row space-between mgb-2">
                        <div className="title white">Buy {cryptoSymbol}</div>
                        <div className="content-row">
                          <div className="label gray">
                            {BigNumber(MOCK_USER_CURRENCY["usdt"]).toFormat(
                              FORMAT_DECIMAL
                            )}
                          </div>
                          <div className="label gray mgl-8">USDT</div>
                        </div>
                      </div>
                      <InputTrade
                        prefix="Market"
                        value="Market"
                        disabled={true}
                        suffix="USDT"
                      />
                      <InputTrade
                        prefix="Amount"
                        suffix={cryptoSymbol}
                        value={valueAmountBuyMarket}
                        onChange={(e) => {
                          setValueAmountBuyMarket(e);
                          calPriceMarket("amountbuy", e);
                        }}
                      />
                      <ValueStep value={(e) => calPriceMarket("stepbuy", e)} />
                      <Button label="Buy BTC" color="green" />
                    </div>

                    <div className="content-column" style={{ flex: "1 1 0%" }}>
                      <div className="content-row space-between mgb-2">
                        <div className="title white">Sell {cryptoSymbol}</div>
                        <div className="content-row">
                          <div className="label gray">
                            {BigNumber(
                              MOCK_USER_CURRENCY[cryptoSymbol.toLowerCase()]
                            ).toFormat(FORMAT_DECIMAL)}
                          </div>
                          <div className="label gray mgl-8">{cryptoSymbol}</div>
                        </div>
                      </div>
                      <InputTrade
                        prefix="Market"
                        value="Market"
                        disabled={true}
                        suffix="USDT"
                      />
                      <InputTrade
                        prefix="Amount"
                        suffix={cryptoSymbol}
                        value={valueAmountSellMarket}
                        onChange={(e) => {
                          setValueAmountSellMarket(e);
                          calPriceMarket("amountsell", e);
                        }}
                      />
                      <ValueStep value={(e) => calPriceMarket("stepsell", e)} />
                      <Button label="Sell BTC" color="red" />
                    </div>
                  </div>
                </div>
              </TabPane>
            </Tab>
          </OrderForm>
          <Trades name="trades">
            <div className="trades-container">
              <div className="content-column mgb-16">
                <div className="paragraph mgb-8">Market Trades</div>
                <div
                  className="content-row space-between mgb-2"
                  style={{ paddingRight: "22px" }}
                >
                  <div
                    className="label gray align-items-start"
                    style={{ minWidth: "70px" }}
                  >
                    Price(USDT)
                  </div>
                  <div
                    className="label gray align-items-end "
                    style={{ minWidth: "75px" }}
                  >
                    Amount({cryptoSymbol})
                  </div>
                  <div
                    className="label gray align-items-end text-right"
                    style={{ minWidth: "60px" }}
                  >
                    Time
                  </div>
                </div>
                <div className="trades-price-container">
                  {arg.trades.length >= 32 &&
                    arg.trades.map((item, index) => {
                      var data = arg.trades[32 - index];
                      if (index >= 3 && index <= 32) {
                        var prv_data = arg.trades[31 - index];
                        return (
                          <div
                            className="content-row space-between mgb-2"
                            style={{ paddingRight: "16px" }}
                            key={index}
                          >
                            <div
                              // className="label red align-items-start"
                              className={ClassNames(
                                "label align-items-start",
                                prv_data.p < data.p ? "green" : "red"
                              )}
                              style={{ minWidth: "70px" }}
                            >
                              {BigNumber(data.p).toFormat(2)}
                            </div>
                            <div
                              className="label white align-items-end text-right"
                              style={{ minWidth: "75px" }}
                            >
                              {data.q}
                            </div>
                            <div
                              className="label white align-items-end text-right"
                              style={{ minWidth: "60px" }}
                            >
                              {convertTime(data.T)}
                            </div>
                          </div>
                        );
                      } else return null;
                    })}
                  {/* {arg.trades.length >= 30 &&
                arg.trades.map((data, index) => {
                  if (index >= 1 && index <= 30) {
                    var prv_data = trades[index - 1];
                    return (
                      <div
                        className="content-row space-between mgb-2"
                        style={{ paddingRight: "16px" }}
                        key={index}
                      >
                        <div
                          // className="label red align-items-start"
                          className={ClassNames(
                            "label align-items-start",
                            prv_data.p < data.p ? "green" : "red"
                          )}
                          style={{ minWidth: "70px" }}
                        >
                          {convertTwoDegit(data.p)}
                        </div>
                        <div
                          className="label white align-items-end text-right"
                          style={{ minWidth: "75px" }}
                        >
                          {data.q}
                        </div>
                        <div
                          className="label white align-items-end text-right"
                          style={{ minWidth: "60px" }}
                        >
                          {convertTime(data.T)}
                        </div>
                      </div>
                    );
                  } else return null;
                })} */}
                </div>
              </div>
            </div>
          </Trades>
          <Profile name="profile">
            <div className="profile-container">
              <div className="content-column mgb-16">
                <div className="paragraph mgb-8">Fiat balance</div>
                <div className="content-row space-between">
                  <div className="content-column">
                    <div className="paragraph">USDT</div>
                    <div className="label gray">TetherUS</div>
                  </div>
                  <div className="content-column text-right">
                    <div className="paragraph">49657.01</div>
                    <div className="label gray">$ 49657.01</div>
                  </div>
                </div>
              </div>
              <div className="content-column">
                <div className="paragraph mgb-8">Spot balance</div>
                <div className="content-row space-between mgb-8">
                  <div className="label gray">Coin</div>
                  <div className="label gray text-right">Total</div>
                </div>
                <div className="content-row space-between align-items-center  mgb-8">
                  <div className="content-row">
                    <div className="content-row  align-items-center mgr-8">
                      <div className="logo-symbol bitcoin"></div>
                    </div>
                    <div className="content-column">
                      <div className="label">BTC</div>
                      <div className="text-9">Bitcoin</div>
                    </div>
                  </div>
                  <div className="label">0.00000091</div>
                </div>

                <div className="content-row space-between align-items-center  mgb-8">
                  <div className="content-row">
                    <div className="content-row  align-items-center mgr-8">
                      <div className="logo-symbol cardano"></div>
                    </div>
                    <div className="content-column">
                      <div className="label">ADA</div>
                      <div className="text-9">Cardano</div>
                    </div>
                  </div>
                  <div className="label">129.33490000</div>
                </div>

                <div className="content-row space-between align-items-center  mgb-8">
                  <div className="content-row">
                    <div className="content-row  align-items-center mgr-8">
                      <div className="logo-symbol ethereum"></div>
                    </div>
                    <div className="content-column">
                      <div className="label">ETH</div>
                      <div className="text-9">Ethereum</div>
                    </div>
                  </div>
                  <div className="label">0.00138437</div>
                </div>

                <div className="content-row space-between align-items-center  mgb-8">
                  <div className="content-row">
                    <div className="content-row  align-items-center mgr-8">
                      <div className="logo-symbol bitcoin-cash"></div>
                    </div>
                    <div className="content-column">
                      <div className="label">BCH</div>
                      <div className="text-9">Bitcoin Cash</div>
                    </div>
                  </div>
                  <div className="label">0.000</div>
                </div>

                <div className="content-row space-between align-items-center  mgb-8">
                  <div className="content-row">
                    <div className="content-row  align-items-center mgr-8">
                      <div className="logo-symbol polkadot"></div>
                    </div>
                    <div className="content-column">
                      <div className="label">DOT</div>
                      <div className="text-9">Polkadot</div>
                    </div>
                  </div>
                  <div className="label">0.000</div>
                </div>
              </div>
            </div>
          </Profile>
          <OrderHistory name="orderHistory">
            <Tab active={"Open Order"}>
              <TabPane name="Open Order" key="1">
                <div className="open-order-container">
                  <div className="content-row space-between mgb-8">
                    <div
                      className="label gray text-center"
                      style={{ minWidth: "126px" }}
                    >
                      Date
                    </div>
                    <div
                      className="label gray text-center"
                      style={{ minWidth: "64px" }}
                    >
                      Pair
                    </div>
                    <div
                      className="label gray text-center"
                      style={{ minWidth: "28px" }}
                    >
                      Type
                    </div>
                    <div
                      className="label gray text-center"
                      style={{ minWidth: "24px" }}
                    >
                      Side
                    </div>
                    <div
                      className="label gray text-center"
                      style={{ minWidth: "96px" }}
                    >
                      Price
                    </div>
                    <div
                      className="label gray text-center"
                      style={{ minWidth: "96px" }}
                    >
                      Amount
                    </div>
                    <div
                      className="label gray text-center"
                      style={{ minWidth: "52px" }}
                    >
                      Filled
                    </div>
                    <div
                      className="label gray text-center"
                      style={{ minWidth: "126px" }}
                    >
                      Total
                    </div>
                    <div
                      className="label gray text-center"
                      style={{ minWidth: "126px" }}
                    >
                      Action
                    </div>
                  </div>

                  <div className="content-row space-between order-container align-items-center">
                    <div
                      className="label gray text-center"
                      style={{ minWidth: "126px" }}
                    >
                      03-09 11:29:32
                    </div>
                    <div
                      className="label white text-center"
                      style={{ minWidth: "64px" }}
                    >
                      {cryptoSymbol}/USDT
                    </div>
                    <div
                      className="label white text-center"
                      style={{ minWidth: "28px" }}
                    >
                      Limit
                    </div>
                    <div
                      className="label red text-center"
                      style={{ minWidth: "24px" }}
                    >
                      Sell
                    </div>
                    <div
                      className="label white text-center"
                      style={{ minWidth: "96px" }}
                    >
                      52276.99
                    </div>
                    <div
                      className="label white text-center"
                      style={{ minWidth: "96px" }}
                    >
                      0.000001
                    </div>
                    <div
                      className="label white text-center"
                      style={{ minWidth: "52px" }}
                    >
                      100.00%
                    </div>
                    <div
                      className="label white text-center"
                      style={{ minWidth: "126px" }}
                    >
                      258.00000699 USDT
                    </div>
                    <div
                      className="label red text-center pointer"
                      style={{ minWidth: "126px" }}
                    >
                      Cancel
                    </div>
                  </div>

                  <div className="content-row space-between order-container even align-items-center">
                    <div
                      className="label gray text-center"
                      style={{ minWidth: "126px" }}
                    >
                      03-09 11:29:32
                    </div>
                    <div
                      className="label white text-center"
                      style={{ minWidth: "64px" }}
                    >
                      {cryptoSymbol}/USDT
                    </div>
                    <div
                      className="label white text-center"
                      style={{ minWidth: "28px" }}
                    >
                      Limit
                    </div>
                    <div
                      className="label red text-center"
                      style={{ minWidth: "24px" }}
                    >
                      Sell
                    </div>
                    <div
                      className="label white text-center"
                      style={{ minWidth: "96px" }}
                    >
                      52276.99
                    </div>
                    <div
                      className="label white text-center"
                      style={{ minWidth: "96px" }}
                    >
                      0.000001
                    </div>
                    <div
                      className="label white text-center"
                      style={{ minWidth: "52px" }}
                    >
                      100.00%
                    </div>
                    <div
                      className="label white text-center"
                      style={{ minWidth: "126px" }}
                    >
                      258.00000699 USDT
                    </div>
                    <div
                      className="label red text-center pointer"
                      style={{ minWidth: "126px" }}
                    >
                      Cancel
                    </div>
                  </div>

                  <div className="content-row space-between order-container  align-items-center">
                    <div
                      className="label gray text-center"
                      style={{ minWidth: "126px" }}
                    >
                      03-09 11:29:32
                    </div>
                    <div
                      className="label white text-center"
                      style={{ minWidth: "64px" }}
                    >
                      {cryptoSymbol}/USDT
                    </div>
                    <div
                      className="label white text-center"
                      style={{ minWidth: "28px" }}
                    >
                      Limit
                    </div>
                    <div
                      className="label red text-center"
                      style={{ minWidth: "24px" }}
                    >
                      Sell
                    </div>
                    <div
                      className="label white text-center"
                      style={{ minWidth: "96px" }}
                    >
                      52276.99
                    </div>
                    <div
                      className="label white text-center"
                      style={{ minWidth: "96px" }}
                    >
                      0.000001
                    </div>
                    <div
                      className="label white text-center"
                      style={{ minWidth: "52px" }}
                    >
                      100.00%
                    </div>
                    <div
                      className="label white text-center"
                      style={{ minWidth: "126px" }}
                    >
                      258.00000699 USDT
                    </div>
                    <div
                      className="label red text-center pointer"
                      style={{ minWidth: "126px" }}
                    >
                      Cancel
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane name="Order History" key="2">
                Content of Tab Pane 2
              </TabPane>
              <TabPane name="Trade History" key="3">
                Content of Tab Pane 3
              </TabPane>
            </Tab>
          </OrderHistory>
        </>
      )}
    </HomeStyled>
  );
};

export default HomeContainer;
