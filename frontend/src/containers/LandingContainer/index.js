import * as React from "react";
import { useState, useEffect } from "react";
import ClassNames from "classnames";
import {
  LandingStyled,
  Header,
  SubHeader,
  BalanceContainer,
  InfomationContainer,
  FiatBalanceContainer,
  SpotBalanceContainer,
  GetStartedSection,
  CryptoBalance,
  InfoWrapper,
  StartTradingSection,
} from "./styled";
import { Container, NavBar, Button } from "components";
import { useQuery, gql } from "@apollo/client";
import BigNumber from "bignumber.js";
import { marketController } from "apiService";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import {
  MOCK_WALLET,
  CRYPTO_INDEX,
  MOCK_ALL_CUR_PRICE,
  MOCK_USER_INFO,
} from "helpers";

const GET_ALL_SYMBOL = gql`
  query {
    getAllCurrencyWithNoStatic {
      currency
      currencyLongName
    }
    getUserWalletByToken {
      amount
      inOrder
      currency {
        currency
        currencyLongName
      }
    }
    getUserByToken {
      role {
        id
        role
      }
      firstName
      lastName
      phone
      email
      gender
      birthDate
      nationality
      city
      address
    }
  }
`;

const LandingContainer = ({ match, ...props }) => {
  const [userWallet, setUserWallet] = useState(MOCK_WALLET);
  const [userInfo, setUserInfo] = useState(MOCK_USER_INFO);
  const [coinSymbol, setCoinSymbol] = useState([
    {
      __typename: "Currency",
      currencyShortName: "BTC",
      currency: "Bitcoin",
    },
  ]);

  const [getCurPrice, setgetCurPrice] = useState(MOCK_ALL_CUR_PRICE);
  const [isUpPrice, setIsUpPrice] = useState(true);
  const [btcTicker, setBtcTicker] = useState({});
  const [adaTicker, setAdaTicker] = useState({});
  const [ethTicker, setEthTicker] = useState({});
  const [bchTicker, setBchTicker] = useState({});
  const [dotTicker, setDotTicker] = useState({});
  const [streams] = useState([
    "btcusdt@ticker",
    "adausdt@ticker",
    "ethusdt@ticker",
    "bchusdt@ticker",
    "dotusdt@ticker",
  ]);
  const curPrice = [];

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
  const dispatch = useDispatch();
  const arg = useSelector((state) => state, isEqual);

  const { loading, error, data } = useQuery(GET_ALL_SYMBOL);

  const GetPrice = async () => {
    const crypto_price = await marketController().getPrice("");
    crypto_price.map((data, index) => {
      switch (data.symbol) {
        case "BTCUSDT":
        case "ADAUSDT":
        case "ETHUSDT":
        case "BCHUSDT":
        case "DOTUSDT":
        case "ADABTC":
        case "ETHBTC":
        case "BCHBTC":
        case "DOTBTC":
          curPrice.push(data);
          break;

        default:
          break;
      }
    });
    setgetCurPrice(curPrice);
    console.log(getCurPrice);
  };

  const getTotal = (flag) => {
    return (
      Number(userWallet[CRYPTO_INDEX[flag]].amount) +
      Number(userWallet[CRYPTO_INDEX[flag]].inOrder)
    );
  };

  const getBTCTotal = () => {
    return (
      getTotal("ada") * Number(getCurPrice[3].price) +
      getTotal("eth") * Number(getCurPrice[0].price) +
      getTotal("bch") * Number(getCurPrice[5].price) +
      getTotal("dot") * Number(getCurPrice[7].price) +
      getTotal("btc")
    );
  };

  const isEqual = (l, r) => {
    if (l.ticker.c !== r.ticker.c)
      if (l.ticker.c >= r.ticker.c) setIsUpPrice(true);
      else setIsUpPrice(false);
  };

  const _connectSocketStreams = (streams) => {
    streams = streams.join("/");
    let connection = btoa(streams);
    connection = new WebSocket(
      `wss://stream.binance.com:9443/stream?streams=${streams}`
    );
    connection.onmessage = (evt) => {
      let eventData = JSON.parse(evt.data);
      // console.log(eventData);

      if (eventData.stream.startsWith("btcusdt")) {
        setBtcTicker(eventData.data);
      }
      if (eventData.stream.startsWith("adausdt")) {
        setAdaTicker(eventData.data);
      }
      if (eventData.stream.startsWith("ethusdt")) {
        setEthTicker(eventData.data);
      }
      if (eventData.stream.startsWith("bchusdt")) {
        setBchTicker(eventData.data);
      }
      if (eventData.stream.startsWith("dotusdt")) {
        setDotTicker(eventData.data);
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

  useEffect(() => {
    _connectSocketStreams(streams);
    // GetPrice();
    return () => {
      _disconnectSocketStreams(streams);
    };
  }, []);

  useEffect(() => {
    if (data && data.getAllCurrencyWithNoStatic) {
      setCoinSymbol(data.getAllCurrencyWithNoStatic);
    }
    if (data && data.getUserWalletByToken) {
      setUserWallet(data.getUserWalletByToken);
    }
    if (data && data.getUserByToken) {
      console.log(data.getUserByToken);
      setUserInfo(data.getUserByToken);
    }
  }, [data]);

  useEffect(() => {
    GetPrice();
  }, []);

  return (
    <LandingStyled>
      <Header name="header">
        <NavBar />
      </Header>
      <Container>
        <div className="content-column " style={{ marginTop: "8rem" }}>
          <div className="headline white">LET’S Rich TOGETHER!!!!</div>
          <div className="paragraph gray mgb-24">
            Add cash or crypto funds to your wallet and start trading right away
          </div>
          <a href="/login">
            <Button
              style={{
                marginTop: "16px",
                width: "200px",
                marginBottom: "48px",
              }}
              label="Find account"
              color="purple"
              fontColor="white"
              onClick={() => {}}
            />
          </a>
        </div>

        <div
          className="content-row space-between mgb-16"
          style={{ marginTop: "8rem" }}
        >
          <div className="content-column" style={{ minWidth: "200px" }}>
            <div className="content-row">
              <div className="label gray">BTC/USDT</div>
              <div
                className={ClassNames(
                  "label ",
                  Number(btcTicker.P) > 0 ? "green" : "red"
                )}
              >
                {btcTicker.P}%
              </div>
            </div>
            <div className="section-headline white">
              {BigNumber(btcTicker.c).toFormat(2, FORMAT_DECIMAL)}
            </div>
            <div className="label gray">
              ${BigNumber(btcTicker.c).toFormat(2, FORMAT_DECIMAL)}
            </div>
          </div>
          <div className="content-column" style={{ minWidth: "156px" }}>
            <div className="content-row">
              <div className="label gray">ADA/USDT</div>
              <div
                className={ClassNames(
                  "label ",
                  Number(adaTicker.P) > 0 ? "green" : "red"
                )}
              >
                {adaTicker.P}%
              </div>
            </div>
            <div className="section-headline white">
              {BigNumber(adaTicker.c).toFormat(2, FORMAT_DECIMAL)}
            </div>
            <div className="label gray">
              ${BigNumber(adaTicker.c).toFormat(2, FORMAT_DECIMAL)}
            </div>
          </div>
          <div className="content-column" style={{ minWidth: "156px" }}>
            <div className="content-row">
              <div className="label gray">ETH/USDT</div>
              <div
                className={ClassNames(
                  "label ",
                  Number(ethTicker.P) > 0 ? "green" : "red"
                )}
              >
                {ethTicker.P}%
              </div>
            </div>
            <div className="section-headline white">
              {BigNumber(ethTicker.c).toFormat(2, FORMAT_DECIMAL)}
            </div>
            <div className="label gray">
              ${BigNumber(ethTicker.c).toFormat(2, FORMAT_DECIMAL)}
            </div>
          </div>
          <div className="content-column" style={{ minWidth: "156px" }}>
            <div className="content-row">
              <div className="label gray">BCH/USDT</div>
              <div
                className={ClassNames(
                  "label ",
                  Number(bchTicker.P) > 0 ? "green" : "red"
                )}
              >
                {bchTicker.P}%
              </div>
            </div>
            <div className="section-headline white">
              {BigNumber(bchTicker.c).toFormat(2, FORMAT_DECIMAL)}
            </div>
            <div className="label gray">
              ${BigNumber(bchTicker.c).toFormat(2, FORMAT_DECIMAL)}
            </div>
          </div>
          <div className="content-column" style={{ minWidth: "156px" }}>
            <div className="content-row">
              <div className="label gray">DOT/USDT</div>
              <div
                className={ClassNames(
                  "label ",
                  Number(dotTicker.P) > 0 ? "green" : "red"
                )}
              >
                {dotTicker.P}%
              </div>
            </div>
            <div className="section-headline white">
              {BigNumber(dotTicker.c).toFormat(2, FORMAT_DECIMAL)}
            </div>
            <div className="label gray">
              ${BigNumber(dotTicker.c).toFormat(2, FORMAT_DECIMAL)}
            </div>
          </div>
        </div>
      </Container>

      <CryptoBalance>
        <div className="p-16" style={{ width: "1024px" }}>
          <div
            className="feature-card-title white mgb-32 mgt-32"
            style={{ marginTop: "12rem" }}
          >
            Market trend
          </div>
          <div className="content-row space-between mgb-24">
            <div className="label white text-left" style={{ minWidth: "96px" }}>
              Coin
            </div>
            <div className="content-row">
              <div
                className="label white text-right"
                style={{ minWidth: "200px" }}
              >
                Vloumn
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "200px" }}
              >
                Last Price
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "200px" }}
              >
                24h Change
              </div>
            </div>
          </div>

          <div className="content-row space-between align-items-center mgb-32">
            <div className="content-row" style={{ minWidth: "96px" }}>
              <div className="content-row  align-items-center mgr-8">
                <div className="logo-symbol bitcoin"></div>
              </div>
              <div className="content-row">
                <div className="paragraph mgr-8">BTC</div>
                <div className="paragraph white">Bitcoin</div>
              </div>
            </div>
            <div className="content-row">
              <div
                className="paragraph white text-right"
                style={{ minWidth: "200px" }}
              >
                {BigNumber(btcTicker.q).toFormat(2)}
              </div>

              <div
                className="paragraph white text-right"
                style={{ minWidth: "200px" }}
              >
                {BigNumber(btcTicker.c).toFormat(2)} $
              </div>
              <div
                className={ClassNames("paragraph white text-right")}
                style={{ minWidth: "200px" }}
              >
                {btcTicker.P}%
              </div>
            </div>
          </div>

          <div className="content-row space-between align-items-center mgb-32">
            <div className="content-row" style={{ minWidth: "96px" }}>
              <div className="content-row  align-items-center mgr-8">
                <div className="logo-symbol cardano"></div>
              </div>
              <div className="content-row">
                <div className="paragraph mgr-8">ADA</div>
                <div className="paragraph white">Cardano</div>
              </div>
            </div>
            <div className="content-row">
              <div
                className="paragraph white text-right"
                style={{ minWidth: "200px" }}
              >
                {BigNumber(adaTicker.q).toFormat(2)}
              </div>
              <div
                className="paragraph white text-right"
                style={{ minWidth: "200px" }}
              >
                {BigNumber(adaTicker.c).toFormat(2)} $
              </div>
              <div
                className="paragraph white text-right"
                style={{ minWidth: "200px" }}
              >
                {adaTicker.P}%
              </div>
            </div>
          </div>

          <div className="content-row space-between align-items-center mgb-32">
            <div className="content-row" style={{ minWidth: "96px" }}>
              <div className="content-row  align-items-center mgr-8">
                <div className="logo-symbol ethereum"></div>
              </div>
              <div className="content-row">
                <div className="paragraph mgr-8">ETH</div>
                <div className="paragraph white">Ethereum</div>
              </div>
            </div>
            <div className="content-row">
              <div
                className="paragraph white text-right"
                style={{ minWidth: "200px" }}
              >
                {BigNumber(ethTicker.q).toFormat(2)}
              </div>
              <div
                className="paragraph white text-right"
                style={{ minWidth: "200px" }}
              >
                {BigNumber(ethTicker.c).toFormat(2)} $
              </div>
              <div
                className="paragraph white text-right"
                style={{ minWidth: "200px" }}
              >
                {ethTicker.P}%
              </div>
            </div>
          </div>

          <div className="content-row space-between align-items-center mgb-32">
            <div className="content-row" style={{ minWidth: "96px" }}>
              <div className="content-row  align-items-center mgr-8">
                <div className="logo-symbol bitcoin-cash"></div>
              </div>
              <div className="content-row">
                <div className="paragraph mgr-8">BCH</div>
                <div className="paragraph white">Bitcoin Cash</div>
              </div>
            </div>
            <div className="content-row">
              <div
                className="paragraph white text-right"
                style={{ minWidth: "200px" }}
              >
                {BigNumber(bchTicker.q).toFormat(2)}
              </div>
              <div
                className="paragraph white text-right"
                style={{ minWidth: "200px" }}
              >
                {BigNumber(bchTicker.c).toFormat(2)} $
              </div>
              <div
                className="paragraph white text-right"
                style={{ minWidth: "200px" }}
              >
                {bchTicker.P}%
              </div>
            </div>
          </div>

          <div className="content-row space-between align-items-center mgb-32">
            <div className="content-row" style={{ minWidth: "96px" }}>
              <div className="content-row  align-items-center mgr-8">
                <div className="logo-symbol polkadot"></div>
              </div>
              <div className="content-row">
                <div className="paragraph mgr-8">DOT</div>
                <div className="paragraph white">Polkadot</div>
              </div>
            </div>
            <div className="content-row">
              <div
                className="paragraph white text-right"
                style={{ minWidth: "200px" }}
              >
                {BigNumber(dotTicker.q).toFormat(2)}
              </div>
              <div
                className="paragraph white text-right"
                style={{ minWidth: "200px" }}
              >
                {BigNumber(dotTicker.c).toFormat(2)} $
              </div>
              <div
                className="paragraph white text-right"
                style={{ minWidth: "200px" }}
              >
                {dotTicker.P}%
              </div>
            </div>
          </div>
        </div>
      </CryptoBalance>
      <StartTradingSection className="content-row justify-content-center">
        <div
          className="p-16"
          style={{
            width: "728px",
            background: "#ffffff",
            borderRadius: "30px",
          }}
        >
          <div className="content-row justify-content-center mgt-32">
            <div className="content-column">
              <div className="section-headline black mgb-24">
                Start trading now
              </div>
              <a href="/trades/btcusdt">
                <Button
                  style={{
                    marginTop: "16px",
                    width: "200px",
                    marginBottom: "48px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  label="Trade Now"
                  color="purple"
                  fontColor="white"
                  onClick={() => {}}
                />
              </a>
            </div>
          </div>
        </div>
      </StartTradingSection>
      <GetStartedSection></GetStartedSection>
    </LandingStyled>
  );
};

export default LandingContainer;
