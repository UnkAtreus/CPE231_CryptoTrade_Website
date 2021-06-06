import * as React from "react";
import { useState, useEffect } from "react";
import {
  OwnerStyled,
  Header,
  SubHeader,
  BalanceContainer,
  InfomationContainer,
  FiatBalanceContainer,
  SpotBalanceContainer,
  CryptoBalance,
  InfoWrapper,
  OrderContainer,
  TopContainer,
  ShowDataContainer,
  CardContainer,
} from "./styled";
import { Container, NavBar } from "components";
import { useQuery, gql } from "@apollo/client";
import BigNumber from "bignumber.js";
import { marketController } from "apiService";
import moment from "moment";
// import Chart from "chart.js";
import { Bar } from "react-chartjs-2";

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

const OwnerContainer = ({ match, ...props }) => {
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

  const data_chart = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
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

  const context_data = (canvas) => {
    const ctx = canvas.getContext("2d");

    return {
      labels: [
        "Monday",
        "Thuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      datasets: [
        {
          label: "order",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgb(154, 78, 255)",
            "rgb(154, 78, 255)",
            "rgb(154, 78, 255)",
            "rgb(154, 78, 255)",
            "rgb(154, 78, 255)",
          ],
          borderColor: [
            "rgba(153, 102, 255, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const plugin = {
    id: "custom_canvas_background_color",
    beforeDraw: (chart) => {
      const ctx = chart.canvas.getContext("2d");
      ctx.save();
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = "rgb(0,0,0,0.1)";
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    },
  };

  useEffect(() => {
    GetPrice();
  }, []);

  return (
    <OwnerStyled>
      <Header name="header">
        <NavBar />
      </Header>
      <Container>
        <SubHeader>
          <div className="feature-card-title white">Owner CMS</div>
        </SubHeader>
        <div className="content-row space-between mgb-8">
          <CardContainer>
            <div>
              <div className="section-headline gray">Order</div>
              <div className="headline white mgl-32">3.4 K</div>
            </div>
          </CardContainer>
          <CardContainer>
            <div>
              <div className="section-headline gray">New Customer</div>
              <div className="headline white mgl-32">12</div>
            </div>
          </CardContainer>
          <CardContainer>
            <div>
              <div className="section-headline gray">Volumn Trade</div>
              <div className="headline white mgl-32">1.12 M</div>
            </div>
          </CardContainer>
        </div>
        <ShowDataContainer>
          <div className="content-clumn" style={{ width: "100%" }}>
            <div className="section-headline white mgb-24">Order</div>

            {/* <div className="content-column " style={{ width: "100%" }}>
            <div className="section-headline gray mgb-24">Order</div>
            <div className="content-row mgb-8">
              <div
                className="title gray text-center"
                style={{ minWidth: "156px" }}
              >
                Date
              </div>
              <div
                className="title gray text-center"
                style={{ minWidth: "156px", marginLeft: "32px" }}
              >
                Total order
              </div>
            </div>
            <div className="content-row mgb-8">
              <div
                className="title white text-center"
                style={{ minWidth: "156px" }}
              >
                20/01/2544
              </div>
              <div
                className="title white text-center"
                style={{ minWidth: "156px", marginLeft: "32px" }}
              >
                10215645
              </div>
            </div>
          </div> */}
            <Bar data={context_data} plugins={[plugin]} options={options} />
          </div>
        </ShowDataContainer>
        <div className="content-row mgb-8">
          <TopContainer>
            <div className="content-column" style={{ width: "100%" }}>
              <div className="section-headline gray mgb-24">
                Top 5 user dominate currency
              </div>
              <div className="content-row space-between">
                <div className="content-column text-center">
                  <div className="title gray mgb-8">BTC</div>
                  <div className="paragraph white mgb-8">000001</div>
                  <div className="paragraph white mgb-8">000001</div>
                  <div className="paragraph white mgb-8">000001</div>
                  <div className="paragraph white mgb-8">000001</div>
                  <div className="paragraph white mgb-8">000001</div>
                </div>
                <div className="content-column text-center">
                  <div className="title gray mgb-8">BTC</div>
                  <div className="paragraph white mgb-8">000001</div>
                  <div className="paragraph white mgb-8">000002</div>
                  <div className="paragraph white mgb-8">000004</div>
                  <div className="paragraph white mgb-8">000008</div>
                  <div className="paragraph white mgb-8">000015</div>
                </div>
                <div className="content-column text-center">
                  <div className="title gray mgb-8">BTC</div>
                  <div className="paragraph white mgb-8">000012</div>
                  <div className="paragraph white mgb-8">00004</div>
                  <div className="paragraph white mgb-8">000065</div>
                  <div className="paragraph white mgb-8">000101</div>
                  <div className="paragraph white mgb-8">000054</div>
                </div>
                <div className="content-column text-center">
                  <div className="title gray mgb-8">BTC</div>
                  <div className="paragraph white mgb-8">000124</div>
                  <div className="paragraph white mgb-8">000234</div>
                  <div className="paragraph white mgb-8">000214</div>
                  <div className="paragraph white mgb-8">000012</div>
                  <div className="paragraph white mgb-8">000063</div>
                </div>
                <div className="content-column text-center">
                  <div className="title gray mgb-8">BTC</div>
                  <div className="paragraph white mgb-8">000041</div>
                  <div className="paragraph white mgb-8">005001</div>
                  <div className="paragraph white mgb-8">000031</div>
                  <div className="paragraph white mgb-8">000011</div>
                  <div className="paragraph white mgb-8">000009</div>
                </div>
              </div>
            </div>
          </TopContainer>
          <OrderContainer>
            <div className="content-column">
              <div className="section-headline gray mgb-24">Cancel order</div>
              <div className="title gray">Amount</div>
              <div className="headline white mgl-32">1500</div>
              <div className="title gray">Total value</div>
              <div className="headline white mgl-32">15078 $</div>
            </div>
          </OrderContainer>
        </div>
        <InfomationContainer>
          <div className="content-column">
            <div className="section-headline gray mgb-24">FEE</div>
          </div>
        </InfomationContainer>
      </Container>
    </OwnerStyled>
  );
};

export default OwnerContainer;
