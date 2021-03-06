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

    getAllFiat {
      method
      bank {
        banktype {
          bank
        }
        bankNumber
      }
      status
      amount
      totalBalanceLeft
      fee
    }

    allVeri {
      id
      status
      imageUrl
      created_at
      updated_at
      user {
        id
      }
    }
  }
`;

const StaffContainer = ({ match, ...props }) => {
  const [userWallet, setUserWallet] = useState(MOCK_WALLET);
  const [userInfo, setUserInfo] = useState(MOCK_USER_INFO);
  const [getAllFiat, setGetAllFiat] = useState([]);
  const [countVeri, setCountVeri] = useState(0);
  const [countWithdraw, setCountWithdraw] = useState(0);
  const [allVeri, setAllVeri] = useState([]);
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
          // console.log(data);
          curPrice.push(data);
          break;

        default:
          break;
      }
    });
    setgetCurPrice(curPrice);
    // console.log(getCurPrice);
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
    if (data && data.allVeri) {
      console.log(data.allVeri);
      let count = 0;
      data.allVeri.map((data) => {
        if (data.status !== "0") count += 1;
      });
      setCountVeri(count);
      setAllVeri(data.allVeri);
    }
    if (data && data.getAllFiat) {
      var temp = [];
      let count = 0;
      data.getAllFiat.map((data) => {
        if (data.method === "1") {
          temp.push(data);
          if (data.status !== "1") {
            count += 1;
          }
        }
      });
      setCountWithdraw(count);
      setGetAllFiat(temp);
    }
  }, [data]);

  useEffect(() => {
    GetPrice();
  }, []);

  return (
    <SettingStyled>
      <Header name="header">
        <NavBar />
      </Header>
      <Container>
        <SubHeader>
          <div className="feature-card-title white">Staff CMS</div>
        </SubHeader>
        <div className="content-row space-between">
          <CardContainer href="/staff/vertify">
            <div>
              <div className="section-headline gray">Vertify</div>
              <div className="headline white mgl-32">{countVeri}</div>
            </div>
          </CardContainer>
          <CardContainer
            href="/staff/withdraw"
            style={{ width: "100%", marginLeft: "8px" }}
          >
            <div>
              <div className="section-headline gray">Withdraw Transaction</div>
              <div className="headline white mgl-32">{countWithdraw}</div>
            </div>
          </CardContainer>
        </div>
      </Container>
    </SettingStyled>
  );
};

export default StaffContainer;
