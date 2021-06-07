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
  GET_ALL_DATA,
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
  const [getAllUser, setGetAllUser] = useState([]);
  const [getAllWallet, setgetAllWallet] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [getAllP2P, setGetAllP2P] = useState([]);
  const [getAllCrypto, setGetAllCrypto] = useState([]);
  const [getAllFiat, setGetAllFiat] = useState([]);
  const [getAllCard, setGetAllCard] = useState([]);
  const [getAllRole, setGetAllRole] = useState([]);
  const [getAllCurrency, setGetAllCurrency] = useState([]);

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

  const { loading, error, data } = useQuery(GET_ALL_DATA);

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
    if (data && data.getUserByToken) {
      setUserInfo(data.getUserByToken);
    }
    if (data && data.getAllUser) {
      setGetAllUser(data.getAllUser);
    }
    if (data && data.getAllWallet) {
      setgetAllWallet(data.getAllWallet);
    }
    if (data && data.AllOrders) {
      setAllOrders(data.AllOrders);
    }
    if (data && data.getAllP2P) {
      setGetAllP2P(data.getAllP2P);
    }
    if (data && data.getAllCrypto) {
      setGetAllCrypto(data.getAllCrypto);
    }
    if (data && data.getAllFiat) {
      setGetAllFiat(data.getAllFiat);
    }
    if (data && data.getAllCard) {
      setGetAllCard(data.getAllCard);
    }
    if (data && data.getAllRole) {
      setGetAllRole(data.getAllRole);
    }
    if (data && data.getAllCurrency) {
      setGetAllCurrency(data.getAllCurrency);
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
              <div className="headline white mgl-32">{getAllUser.length}</div>
            </div>
          </CardContainer>
          <CardContainer href="/admin/wallet">
            <div>
              <div className="section-headline gray">Wallet</div>
              <div className="headline white mgl-32">{getAllWallet.length}</div>
            </div>
          </CardContainer>
          <CardContainer href="/admin/order">
            <div>
              <div className="section-headline gray">Order</div>
              <div className="headline white mgl-32">{allOrders.length}</div>
            </div>
          </CardContainer>
        </div>
        <div className="content-row space-between mgb-8">
          <CardContainer href="/admin/p2p">
            <div>
              <div className="section-headline gray">P2P</div>
              <div className="headline white mgl-32">{getAllP2P.length}</div>
            </div>
          </CardContainer>
          <CardContainer href="/admin/credit">
            <div>
              <div className="section-headline gray">Credit Card</div>
              <div className="headline white mgl-32">{getAllCard.length}</div>
            </div>
          </CardContainer>
          <CardContainer href="/admin/transcrypto">
            <div>
              <div className="section-headline gray">Trans Crypto</div>
              <div className="headline white mgl-32">{getAllCrypto.length}</div>
            </div>
          </CardContainer>
        </div>
        <div className="content-row space-between mgb-8">
          <CardContainer href="/admin/transfiat">
            <div>
              <div className="section-headline gray">Trans Fiat</div>
              <div className="headline white mgl-32">{getAllFiat.length}</div>
            </div>
          </CardContainer>
          <CardContainer href="/admin/role">
            <div>
              <div className="section-headline gray">Role</div>
              <div className="headline white mgl-32">{getAllRole.length}</div>
            </div>
          </CardContainer>
          <CardContainer href="/admin/currency">
            <div>
              <div className="section-headline gray">Currency</div>
              <div className="headline white mgl-32">
                {getAllCurrency.length}
              </div>
            </div>
          </CardContainer>
        </div>
      </Container>
    </SettingStyled>
  );
};

export default AdminContainer;
