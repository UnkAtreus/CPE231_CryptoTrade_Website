import * as React from "react";
import { useState, useEffect } from "react";
import {
  SettingStyled,
  Header,
  SubHeader,
  BalanceContainer,
  InfomationContainer,
  FiatBalanceContainer,
  SpotBalanceContainer,
  CryptoBalance,
  InfoWrapper,
  CardContainer,
} from "./styled";
import { Container, NavBar } from "components";
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

const AdminContainer = ({ match, ...props }) => {
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

  const admin_param = [
    "user",
    "wallet",
    "order",
    "p2p",
    "credit",
    "transcrypto",
    "transfiat",
    "role",
    "currency",
  ];

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
          // console.log(data);
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

  // useEffect(() => {
  //   GetPrice();
  // }, []);

  return (
    <SettingStyled>
      <Header name="header">
        <NavBar />
      </Header>
      <Container>
        <SubHeader>
          <div className="feature-card-title white">Admin CMS</div>
        </SubHeader>
        <div className="content-row space-between mgb-8">
          <CardContainer href="/admin/user">
            <div>
              <div className="section-headline gray">User</div>
              <div className="headline white mgl-32">1010</div>
            </div>
          </CardContainer>
          <CardContainer href="/admin/wallet">
            <div>
              <div className="section-headline gray">Wallet</div>
              <div className="headline white mgl-32">223</div>
            </div>
          </CardContainer>
          <CardContainer href="/admin/order">
            <div>
              <div className="section-headline gray">Order</div>
              <div className="headline white mgl-32">124</div>
            </div>
          </CardContainer>
        </div>
        <div className="content-row space-between mgb-8">
          <CardContainer href="/admin/p2p">
            <div>
              <div className="section-headline gray">P2P</div>
              <div className="headline white mgl-32">1010</div>
            </div>
          </CardContainer>
          <CardContainer href="/admin/credit">
            <div>
              <div className="section-headline gray">Credit Card</div>
              <div className="headline white mgl-32">223</div>
            </div>
          </CardContainer>
          <CardContainer href="/admin/transcrypto">
            <div>
              <div className="section-headline gray">Trans Crypto</div>
              <div className="headline white mgl-32">124</div>
            </div>
          </CardContainer>
        </div>
        <div className="content-row space-between mgb-8">
          <CardContainer href="/admin/transfiat">
            <div>
              <div className="section-headline gray">Trans Fiat</div>
              <div className="headline white mgl-32">1010</div>
            </div>
          </CardContainer>
          <CardContainer href="/admin/role">
            <div>
              <div className="section-headline gray">Role</div>
              <div className="headline white mgl-32">223</div>
            </div>
          </CardContainer>
          <CardContainer href="/admin/currency">
            <div>
              <div className="section-headline gray">Currency</div>
              <div className="headline white mgl-32">124</div>
            </div>
          </CardContainer>
        </div>
      </Container>
    </SettingStyled>
  );
};

export default AdminContainer;
