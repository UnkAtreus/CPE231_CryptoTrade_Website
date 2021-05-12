import React, { useState, useEffect } from "react";
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
import { TabPane } from "components/TabPane";
import { Button } from "components/Button";
import { marketController } from "apiService";
import ClassNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import BigNumber from "bignumber.js";

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
  const [orderbook, setOrderbook] = useState(constants);
  const [isUpPrice, setIsUpPrice] = useState(true);
  const [priceChange, setPriceChange] = useState(0);
  const [priceChangePercent, setPriceChangePercent] = useState(0);
  const [highPrice, setHighPrice] = useState(0);
  const [lowPrice, setLowPrice] = useState(0);
  const [volume, setVolume] = useState(0);
  const [quoteVolume, setQuoteVolume] = useState(0);
  const [trades, setTrades] = useState([]);
  const [streams] = useState(["@ticker", "@depth20", "@trade"]);

  const SYMBOL = props.match.params.symbol
    ? props.match.params.symbol.toLowerCase()
    : "btcusdt";

  const TRADES_COUNT = 32;

  const dispatch = useDispatch();
  const arg = useSelector((state) => state);

  var old_price = 0;

  const _connectSocketStreams = (streams) => {
    streams = streams.join("/");
    let connection = btoa(streams);
    connection = new WebSocket(
      `wss://stream.binance.com:9443/stream?streams=${streams}`
    );
    connection.onmessage = (evt) => {
      let eventData = JSON.parse(evt.data);

      if (eventData.stream.endsWith("@ticker")) {
        eventData.data.lastc = arg.ticker ? arg.ticker.c : 0;
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
      // console.log("ticker", JSON.parse(evt.data).data);
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

  useEffect(() => {
    _connectSocketStreams(streams.map((i) => `${SYMBOL}${i}`));
    return () => {
      _disconnectSocketStreams(this.streams.map((i) => `${SYMBOL}${i}`));
    };
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     old_price = new_price;
  //     GetPrice();
  //     Get24Price();
  //     GetTrades();
  //   }, 200);
  //   return () => clearInterval(interval);
  // }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     GetOrderBook();
  //   }, 2000);
  //   return () => clearInterval(interval);
  // }, []);

  const convertTwoDegit = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const convertTime = (date) => {
    return Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date);
  };

  // const GetPrice = async () => {
  //   const crypto_price = await marketController().getPrice("symbol=BTCUSDT");
  //   var cur_price = (Math.round(crypto_price.price * 100) / 100).toFixed(2);
  //   setPrice(cur_price);
  //   new_price = cur_price;
  //   cur_price >= old_price ? setIsUpPrice(true) : setIsUpPrice(false);
  // };

  const Get24Price = async () => {
    const crypto_24_price = await marketController().get24Price(
      "symbol=BTCUSDT"
    );
    setPriceChange(convertTwoDegit(crypto_24_price.priceChange));
    setPriceChangePercent(convertTwoDegit(crypto_24_price.priceChangePercent));
    setHighPrice(convertTwoDegit(crypto_24_price.highPrice));
    setLowPrice(convertTwoDegit(crypto_24_price.lowPrice));
    setVolume(convertTwoDegit(crypto_24_price.volume));
    setQuoteVolume(convertTwoDegit(crypto_24_price.quoteVolume));
  };

  const GetOrderBook = async () => {
    const order_book = await marketController().getOrderBook(
      "symbol=BTCUSDT&limit=20"
    );
    setOrderbook(order_book);
  };

  const GetTrades = async () => {
    const trades_data = await marketController().getTrades(
      "symbol=BTCUSDT&limit=32"
    );
    trades_data.sort(function (a, b) {
      return parseInt(b.time) - parseInt(a.time);
    });
    setTrades(trades_data);
  };

  // const setValue = (value) => {
  //   console.log("test", value);
  // };

  return (
    <HomeStyled>
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
                Amount(BTC)
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
        <Chart />
      </Chartstyle>
      <SubHeader name="subHeader">
        <Tab>
          <TabPane name="Bitcoin" key="1">
            <div className="subHeader-container">
              <div className="content-row" style={{ alignItems: "flex-end" }}>
                <div className="content-column mgr-32">
                  <div className="paragraph white">
                    {arg.symbols[SYMBOL].symbol}
                  </div>
                  <div className="label gray">{arg.symbols[SYMBOL].name}</div>
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
          <TabPane name="Cardano" key="2">
            <div className="subHeader-container">
              <div className="content-row" style={{ alignItems: "flex-end" }}>
                <div className="content-column mgr-32">
                  <div className="paragraph white">ADA/USDT</div>
                  <div className="label gray">Cardano</div>
                </div>
                <div className="content-column mgr-32">
                  <div className="paragraph green">{price}</div>
                  <div className="label gray">${price}</div>
                </div>
                <div className="content-column mgr-16">
                  <div className="label gray">24h Change</div>
                  <div className="content-row">
                    <div className="label red mgr-4">-3,261.80</div>
                    <div className="label red">-6.00%</div>
                  </div>
                </div>
                <div className="content-column mgr-16">
                  <div className="label gray">24h High</div>
                  <div className="label white">55,542.69</div>
                </div>
                <div className="content-column mgr-16">
                  <div className="label gray">24h Low</div>
                  <div className="label white">50,427.56</div>
                </div>
                <div className="content-column mgr-16">
                  <div className="label gray">24h Volume(BTC)</div>
                  <div className="label white">103,777.03</div>
                </div>
                <div className="content-column mgr-16">
                  <div className="label gray">24h Volume(USDT)</div>
                  <div className="label white">5,423,653,561.61</div>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane name="Ethereum" key="3">
            Content of Tab Pane 3
          </TabPane>
          <TabPane name="Bitcoin Cash" key="4">
            Content of Tab Pane 4
          </TabPane>
          <TabPane name="Polkadot" key="5">
            Content of Tab Pane 5
          </TabPane>
        </Tab>
      </SubHeader>
      <OrderForm name="orderForm">
        <Tab>
          <TabPane name="Limit" key="1">
            <div className="limit-container">
              <div className="content-row space-between">
                <div
                  className="content-column mgr-16"
                  style={{ marginRight: "7%", flex: "1 1 0%" }}
                >
                  <div className="content-row space-between mgb-2">
                    <div className="title white">Buy BTC</div>
                    <div className="content-row">
                      <div className="label gray">0.15143617</div>
                      <div className="label gray mgl-8">USDT</div>
                    </div>
                  </div>
                  <InputTrade prefix="Price" suffix="USDT" />
                  <InputTrade prefix="Amount" suffix="BTC" />
                  <ValueStep />
                  <InputTrade prefix="Total" suffix="USDT" />
                  <Button label="Buy BTC" color="green" />
                </div>

                <div className="content-column" style={{ flex: "1 1 0%" }}>
                  <div className="content-row space-between mgb-2">
                    <div className="title white">Sell BTC</div>
                    <div className="content-row">
                      <div className="label gray">0.00000091</div>
                      <div className="label gray mgl-8">BTC</div>
                    </div>
                  </div>
                  <InputTrade prefix="Price" suffix="USDT" />
                  <InputTrade prefix="Amount" suffix="BTC" />
                  <ValueStep />
                  <InputTrade prefix="Total" suffix="USDT" />
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
                    <div className="title white">Buy BTC</div>
                    <div className="content-row">
                      <div className="label gray">0.15143617</div>
                      <div className="label gray mgl-8">USDT</div>
                    </div>
                  </div>
                  <InputTrade prefix="Market" suffix="USDT" />
                  <InputTrade prefix="Amount" suffix="BTC" />
                  <ValueStep />
                  <InputTrade prefix="Total" suffix="USDT" />
                  <Button label="Buy BTC" color="green" />
                </div>

                <div className="content-column" style={{ flex: "1 1 0%" }}>
                  <div className="content-row space-between mgb-2">
                    <div className="title white">Sell BTC</div>
                    <div className="content-row">
                      <div className="label gray">0.00000091</div>
                      <div className="label gray mgl-8">BTC</div>
                    </div>
                  </div>
                  <InputTrade prefix="Market" suffix="USDT" />
                  <InputTrade prefix="Amount" suffix="BTC" />
                  <ValueStep />
                  <InputTrade prefix="Total" suffix="USDT" />
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
                Amount(BTC)
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
                  BTC/USDT
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
                  BTC/USDT
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
                  BTC/USDT
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
    </HomeStyled>
  );
};

export default HomeContainer;
