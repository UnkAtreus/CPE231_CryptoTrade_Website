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
  CardFeeContainer,
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
import groupArray from "group-array";

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

    getCountOrder

    getCountTransaction

    registerCount

    countOrderCancel

    getMostCurrencyDominate

    getSumFiatFee

    getSumCryptoFee
  }
`;

const OwnerContainer = ({ match, ...props }) => {
  const [userWallet, setUserWallet] = useState(MOCK_WALLET);
  const [userInfo, setUserInfo] = useState(MOCK_USER_INFO);
  const [getCountOrder, setGetCountOrder] = useState([]);
  const [getCountTransaction, setGetCountTransaction] = useState([]);
  const [registerCount, setRegisterCount] = useState([]);
  const [getMostCurrencyDominate, setGetMostCurrencyDominate] = useState([]);
  const [getSumCryptoFee, setGetSumCryptoFee] = useState({});
  const [getSumCryptoFeeDate, setGetSumCryptoFeeDate] = useState({});
  const [getSumFiatFee, setGetSumFiatFee] = useState([]);
  const [countOrder, setCountOrder] = useState(0);
  const [countRegis, setCountRegis] = useState(0);
  const [countTrans, setCountTrans] = useState(0);
  const [coinSymbol, setCoinSymbol] = useState([
    {
      __typename: "Currency",
      currencyShortName: "BTC",
      currency: "Bitcoin",
    },
  ]);

  const [getCurPrice, setgetCurPrice] = useState(MOCK_ALL_CUR_PRICE);
  const [chartTitle, setChartTitle] = useState("Order");
  const [feeTitle, setFeeTitle] = useState("Fee Fiat");
  const [isOpen, setIsOpen] = useState(false);
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
      setUserInfo(data.getUserByToken);
    }
    if (data && data.getMostCurrencyDominate) {
      setGetMostCurrencyDominate(data.getMostCurrencyDominate);
    }
    if (data && data.getCountOrder) {
      setGetCountOrder(data.getCountOrder);
      let count_data = 0;
      data.getCountOrder.map((data) => {
        count_data += Number(data.count);
      });
      setCountOrder(count_data);
    }
    if (data && data.getCountTransaction) {
      let count_data1 = 0;
      setGetCountTransaction(data.getCountTransaction);
      data.getCountTransaction.map((data) => {
        count_data1 += Number(data.count);
      });
      setCountTrans(count_data1);
    }
    if (data && data.registerCount) {
      let count_data2 = 0;
      setRegisterCount(data.registerCount);
      data.registerCount.map((data) => {
        count_data2 += Number(data.count);
      });
      setCountRegis(count_data2);
    }

    if (data && data.getSumCryptoFee) {
      setGetSumCryptoFee(groupArray(data.getSumCryptoFee, "cc_currency"));
      setGetSumCryptoFeeDate(groupArray(data.getSumCryptoFee, "date"));
    }
    if (data && data.getSumFiatFee) {
      setGetSumFiatFee(data.getSumFiatFee);
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

  const order_data = (canvas) => {
    // const ctx = canvas.getContext("2d");
    var labels = [];
    var datas = [];
    if (chartTitle === "Order") {
      getCountOrder.map((data) => {
        labels.push(data.date);
        datas.push(Number(data.count));
      });
    }
    if (chartTitle === "Trasaction") {
      registerCount.map((data) => {
        labels.push(data.date);
        datas.push(Number(data.count));
      });
    }
    if (chartTitle === "New Customer") {
      getCountTransaction.map((data) => {
        labels.push(data.date);
        datas.push(Number(data.count));
      });
    }

    return {
      labels: labels,
      datasets: [
        {
          label: "order",
          data: datas,
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

  const fee_data = (canvas) => {
    // const ctx = canvas.getContext("2d");
    var labels = [];
    var datas = [];
    var label = "";
    var dataset = [];
    var N = 7;
    // console.log(getSumFiatFee);
    console.log(getSumCryptoFee);

    if (feeTitle === "Fee Fiat") {
      getSumFiatFee.map((data, index) => {
        if (index < N) {
          labels.push(data.date);
          datas.push(Number(data.sumFiatFee));
        }
      });

      dataset = [
        {
          label: "Fee Fiat",
          data: datas,
          backgroundColor: ["rgb(154, 78, 255)"],
          borderColor: ["rgba(153, 102, 255, 1)"],
          borderWidth: 1,
        },
      ];
    }
    if (feeTitle === "Fee Crypto") {
      Object.keys(getSumCryptoFee).map((key, index) => {
        label = key;
        getSumCryptoFee[key].map((data, index2) => {
          if (index < N) {
            datas.push(data.sumCryptoFee);
          }
        });
        dataset.push({
          label: label,
          data: datas,
          backgroundColor: ["rgb(154, 78, 255)"],
          borderColor: ["rgba(153, 102, 255, 1)"],
          borderWidth: 1,
        });
        datas = [];
      });
      Object.keys(getSumCryptoFeeDate).map((key, index) => {
        if (index < N) {
          labels.push(key);
        }
      });
    }

    return {
      labels: labels,
      datasets: dataset,
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

  const isToggleChart = () => {
    setIsOpen(!isOpen);
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

  const getChart = () => {
    if (chartTitle === "Order") {
      return (
        <ShowDataContainer>
          <div className="content-clumn" style={{ width: "100%" }}>
            <div className="section-headline white mgb-24">Order</div>
            <Bar data={order_data} plugins={[plugin]} options={options} />
          </div>
        </ShowDataContainer>
      );
    }
    if (chartTitle === "Trasaction") {
      return (
        <ShowDataContainer>
          <div className="content-clumn" style={{ width: "100%" }}>
            <div className="section-headline white mgb-24">Order</div>
            <Bar data={order_data} plugins={[plugin]} options={options} />
          </div>
        </ShowDataContainer>
      );
    }
    if (chartTitle === "New Customer") {
      return (
        <ShowDataContainer>
          <div className="content-clumn" style={{ width: "100%" }}>
            <div className="section-headline white mgb-24">Order</div>
            <Bar data={order_data} plugins={[plugin]} options={options} />
          </div>
        </ShowDataContainer>
      );
    } else if (chartTitle === "Cancle") {
      return <div></div>;
    }
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
          <CardContainer
            onClick={() => {
              setChartTitle("Order");
            }}
          >
            <div>
              <div className="section-headline gray">Order</div>
              <div className="headline white mgl-32">{countOrder}</div>
            </div>
          </CardContainer>
          <CardContainer
            onClick={() => {
              setChartTitle("New Customer");
            }}
          >
            <div>
              <div className="section-headline gray">New Customer</div>
              <div className="headline white mgl-32">{countRegis}</div>
            </div>
          </CardContainer>
          <CardContainer
            onClick={() => {
              setChartTitle("Trasaction");
            }}
          >
            <div>
              <div className="section-headline gray">Trasaction</div>
              <div className="headline white mgl-32">{countTrans}</div>
            </div>
          </CardContainer>
        </div>
        {getChart()}
        <div className="content-row mgb-8">
          <TopContainer>
            <div className="content-column" style={{ width: "100%" }}>
              <div className="section-headline gray mgb-24">
                The Most Currency Dominate
              </div>
              <div className="content-row space-between">
                <div
                  className="label gray mgb-8 text-center"
                  style={{ minWidth: "96px" }}
                >
                  Currency
                </div>
                <div
                  className="label gray mgb-8 text-center"
                  style={{ minWidth: "96px" }}
                >
                  UserID
                </div>
                <div
                  className="label gray mgb-8 text-center"
                  style={{ minWidth: "192px" }}
                >
                  FillName
                </div>

                <div
                  className="label gray mgb-8 text-center mgr-4"
                  style={{ minWidth: "126px" }}
                >
                  Amount
                </div>
              </div>
              <div style={{ overflow: "auto", height: "192px" }}>
                {getMostCurrencyDominate.map((data, index) => (
                  <div className="content-row space-between">
                    <div
                      className="paragraph white mgb-8 text-center"
                      style={{ minWidth: "96px" }}
                    >
                      {data.currency_currency}
                    </div>
                    <div
                      className="paragraph white mgb-8 text-center"
                      style={{ minWidth: "96px" }}
                    >
                      {data.user_id}
                    </div>
                    <div
                      className="paragraph white mgb-8 text-center"
                      style={{ minWidth: "192px" }}
                    >
                      {data.user_firstName + " " + data.user_lastName}
                    </div>

                    <div
                      className="paragraph white mgb-8 text-center"
                      style={{ minWidth: "126px" }}
                    >
                      {BigNumber(data.amount).toFormat(2)}
                    </div>
                  </div>
                ))}
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
        <SubHeader style={{ height: "86px" }}>
          <div className="section-headline white">FEE</div>
        </SubHeader>
        <div className="content-row space-between mgb-8">
          <CardFeeContainer
            className="mgr-8"
            onClick={() => {
              setFeeTitle("Fee Fiat");
            }}
          >
            <div>
              <div className="section-headline gray">From Fiat</div>
              <div className="headline white mgl-32">{countOrder}</div>
            </div>
          </CardFeeContainer>
          <CardFeeContainer
            onClick={() => {
              setFeeTitle("Fee Crypto");
            }}
          >
            <div>
              <div className="section-headline gray">Form Crypto</div>
              <div className="headline white mgl-32">{countRegis}</div>
            </div>
          </CardFeeContainer>
        </div>
        <div className="content-row space-between mgb-8">
          <CardFeeContainer
            className="mgr-8"
            onClick={() => {
              setFeeTitle("Fee Order(Crypto)");
            }}
          >
            <div>
              <div className="section-headline gray">From Order (Crypto)</div>
              <div className="headline white mgl-32">{countOrder}</div>
            </div>
          </CardFeeContainer>
          <CardFeeContainer
            onClick={() => {
              setFeeTitle("Fee Order(USDT)");
            }}
          >
            <div>
              <div className="section-headline gray">From Order (USDT)</div>
              <div className="headline white mgl-32">{countRegis}</div>
            </div>
          </CardFeeContainer>
        </div>

        <InfomationContainer>
          <div className="content-column">
            <div className="section-headline gray mgb-24">{feeTitle}</div>
          </div>
          <Bar data={fee_data} plugins={[plugin]} options={options} />
        </InfomationContainer>
      </Container>
    </OwnerStyled>
  );
};

export default OwnerContainer;
