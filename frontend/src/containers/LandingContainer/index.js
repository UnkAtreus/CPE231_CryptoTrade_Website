import * as React from "react";
import { useState, useEffect } from "react";
import {
  LandingStyled,
  Header,
  SubHeader,
  BalanceContainer,
  InfomationContainer,
  FiatBalanceContainer,
  SpotBalanceContainer,
  CryptoBalance,
  InfoWrapper,
} from "./styled";
import { Container, NavBar, Button } from "components";
import { useQuery, gql } from "@apollo/client";
import BigNumber from "bignumber.js";
import { marketController } from "apiService";
import moment from "moment";

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
        <div className="content-column">
          <div className="headline white">LET’S Rich TOGETHER!!!!</div>
          <div className="paragraph gray mgb-24">
            Add cash or crypto funds to your wallet and start trading right away
          </div>
          <Button
            style={{ marginTop: "16px", width: "200px", marginBottom: "48px" }}
            label="Find account"
            color="purple"
            fontColor="white"
          />
        </div>

        <div className="content-row space-between mgb-32">
          <div className="content-column">
            <div className="content-row">
              <div className="label gray">BTC/USDT</div>
              <div className="label green">+6.15%</div>
            </div>
            <div className="section-headline white">421.03</div>
            <div className="label gray">$421.03</div>
          </div>
          <div className="content-column">
            <div className="content-row">
              <div className="label gray">BTC/USDT</div>
              <div className="label green">+6.15%</div>
            </div>
            <div className="section-headline white">421.03</div>
            <div className="label gray">$421.03</div>
          </div>
          <div className="content-column">
            <div className="content-row">
              <div className="label gray">BTC/USDT</div>
              <div className="label green">+6.15%</div>
            </div>
            <div className="section-headline white">421.03</div>
            <div className="label gray">$421.03</div>
          </div>
          <div className="content-column">
            <div className="content-row">
              <div className="label gray">BTC/USDT</div>
              <div className="label green">+6.15%</div>
            </div>
            <div className="section-headline white">421.03</div>
            <div className="label gray">$421.03</div>
          </div>
          <div className="content-column">
            <div className="content-row">
              <div className="label gray">BTC/USDT</div>
              <div className="label green">+6.15%</div>
            </div>
            <div className="section-headline white">421.03</div>
            <div className="label gray">$421.03</div>
          </div>
        </div>

        <div className="feature-card-title white mgb-32">Market trend</div>

        <CryptoBalance>
          <div className="content-row space-between mgb-24">
            <div className="label gray text-left" style={{ minWidth: "96px" }}>
              Coin
            </div>
            <div className="content-row">
              <div
                className="label gray text-right"
                style={{ minWidth: "200px" }}
              >
                Vloumn
              </div>
              <div
                className="label gray text-right"
                style={{ minWidth: "200px" }}
              >
                Last Price
              </div>
              <div
                className="label gray text-right"
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
                <div className="paragraph gray">Bitcoin</div>
              </div>
            </div>
            <div className="content-row">
              <div
                className="paragraph white text-right"
                style={{ minWidth: "200px" }}
              >
                {BigNumber(getTotal("btc")).toFormat(2, FORMAT_DECIMAL)}
              </div>

              <div
                className="paragraph white text-right"
                style={{ minWidth: "200px" }}
              >
                {BigNumber(userWallet[CRYPTO_INDEX["btc"]].amount).toFormat(
                  2,
                  FORMAT_DECIMAL
                )}
              </div>
              <div
                className="paragraph white text-right"
                style={{ minWidth: "200px" }}
              >
                {BigNumber(userWallet[CRYPTO_INDEX["btc"]].inOrder).toFormat(
                  2,
                  FORMAT_DECIMAL
                )}
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
                <div className="paragraph gray">Cardano</div>
              </div>
            </div>
            <div className="content-row">
              <div
                className="paragraph white text-right"
                style={{ minWidth: "200px" }}
              >
                {BigNumber(getTotal("ada")).toFormat(2, FORMAT_DECIMAL)}
              </div>
              <div
                className="paragraph white text-right"
                style={{ minWidth: "200px" }}
              >
                {BigNumber(userWallet[CRYPTO_INDEX["ada"]].amount).toFormat(
                  2,
                  FORMAT_DECIMAL
                )}
              </div>
              <div
                className="paragraph white text-right"
                style={{ minWidth: "200px" }}
              >
                {BigNumber(userWallet[CRYPTO_INDEX["ada"]].inOrder).toFormat(
                  2,
                  FORMAT_DECIMAL
                )}
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
                <div className="paragraph gray">Ethereum</div>
              </div>
            </div>
            <div className="content-row">
              <div
                className="paragraph white text-right"
                style={{ minWidth: "200px" }}
              >
                {BigNumber(getTotal("eth")).toFormat(2, FORMAT_DECIMAL)}
              </div>
              <div
                className="paragraph white text-right"
                style={{ minWidth: "200px" }}
              >
                {BigNumber(userWallet[CRYPTO_INDEX["eth"]].amount).toFormat(
                  2,
                  FORMAT_DECIMAL
                )}
              </div>
              <div
                className="paragraph white text-right"
                style={{ minWidth: "200px" }}
              >
                {BigNumber(userWallet[CRYPTO_INDEX["eth"]].inOrder).toFormat(
                  2,
                  FORMAT_DECIMAL
                )}
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
                <div className="paragraph gray">Bitcoin Cash</div>
              </div>
            </div>
            <div className="content-row">
              <div
                className="paragraph white text-right"
                style={{ minWidth: "200px" }}
              >
                {BigNumber(getTotal("bch")).toFormat(2, FORMAT_DECIMAL)}
              </div>
              <div
                className="paragraph white text-right"
                style={{ minWidth: "200px" }}
              >
                {BigNumber(userWallet[CRYPTO_INDEX["bch"]].amount).toFormat(
                  2,
                  FORMAT_DECIMAL
                )}
              </div>
              <div
                className="paragraph white text-right"
                style={{ minWidth: "200px" }}
              >
                {BigNumber(userWallet[CRYPTO_INDEX["bch"]].inOrder).toFormat(
                  2,
                  FORMAT_DECIMAL
                )}
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
                <div className="paragraph gray">Polkadot</div>
              </div>
            </div>
            <div className="content-row">
              <div
                className="paragraph white text-right"
                style={{ minWidth: "200px" }}
              >
                {BigNumber(getTotal("dot")).toFormat(2, FORMAT_DECIMAL)}
              </div>
              <div
                className="paragraph white text-right"
                style={{ minWidth: "200px" }}
              >
                {BigNumber(userWallet[CRYPTO_INDEX["dot"]].amount).toFormat(
                  2,
                  FORMAT_DECIMAL
                )}
              </div>
              <div
                className="paragraph white text-right"
                style={{ minWidth: "200px" }}
              >
                {BigNumber(userWallet[CRYPTO_INDEX["dot"]].inOrder).toFormat(
                  2,
                  FORMAT_DECIMAL
                )}
              </div>
            </div>
          </div>
        </CryptoBalance>
      </Container>
    </LandingStyled>
  );
};

export default LandingContainer;
