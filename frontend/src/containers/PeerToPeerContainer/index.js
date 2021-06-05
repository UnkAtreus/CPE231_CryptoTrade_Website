import * as React from "react";
import { useEffect, useState } from "react";
import {
  PeerToPeerStyled,
  Header,
  SubHeader,
  PeerToPeerType,
  PeerToPeerDetail,
  PeerToPeerTypeContainer,
  CoinDropdown,
  PeerToPeerHistory,
  HistoryContainer,
} from "./styled";
import {
  Container,
  Dropdown,
  DropdownChild,
  Button,
  Input,
  NavBar,
  TabWithLink,
  TabPane,
} from "components";
import { useQuery, useMutation, gql } from "@apollo/client";
import BigNumber from "bignumber.js";
import ClassNames from "classnames";
import sortArray from "sort-array";
import moment from "moment";

import { MOCK_WALLET, CRYPTO_INDEX } from "helpers";

const PeerToPeerContainer = ({ match, ...props }) => {
  const [coinSymbol, setCoinSymbol] = useState([
    {
      __typename: "Currency",
      currencyShortName: "BTC",
      currency: "Bitcoin",
    },
  ]);
  const [curSymbol, setCurSymbol] = useState(
    match.params.type.toLowerCase() === "fiat" ? "USD" : "BTC"
  );
  const [payMentMethod, setPayMentMethod] = useState("Bank account");
  const [cryptoAmount, setCryptoAmount] = useState();
  const [p2pHistory, setP2PHistory] = useState([]);
  const [userWallet, setUserWallet] = useState(MOCK_WALLET);
  const [orderParam, setOrderParam] = useState({
    amount: 0,
    targetUser: 30,
    currency: "BTC",
  });

  const depositType = match.params.type
    ? match.params.type.toLowerCase()
    : "crypto";

  const MOCK_USER_CURRENCY = {
    btc: 0.00000091,
    ada: 129.3349,
    eth: 0.00138437,
    bch: 0,
    dot: 0,
    usdt: 49657.01,
  };

  const MOCK_FIAT = [
    {
      currencyShortName: "USD",
      currency: "US Dollar",
    },
    {
      currencyShortName: "THB",
      currency: "Thai Bath",
    },
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

  const GET_ALL_SYMBOL = gql`
    query {
      getAllCurrencyWithNoStatic {
        currency
        currencyLongName
      }
      getUserByToken {
        email
        password
      }
      getUserWalletByToken {
        amount
        currency {
          currency
          currencyLongName
        }
      }
    }
  `;

  const CREATE_ORDER_P2P = gql`
    mutation ($input: PtoPInput!) {
      createP2P(p2pInput: $input) {
        walletFrom {
          amount
          currency {
            currency
          }
        }
        walletTo {
          amount
          currency {
            currency
          }
        }
        amount
        walletFromBalance
        walletToBalance
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery(GET_ALL_SYMBOL);

  const [createOrder] = useMutation(CREATE_ORDER_P2P, {
    onCompleted(order) {
      if (order) {
        console.log(order);
        refetch();
      }
    },
  });

  useEffect(() => {
    if (data && data.getAllCurrencyWithNoStatic) {
      setCoinSymbol(data.getAllCurrencyWithNoStatic);
    }
    if (data && data.getUserByToken) {
      console.log(data.getUserByToken);
    }
    if (data && data.getUserWalletByToken) {
      setUserWallet(data.getUserWalletByToken);
    }
  }, [data]);

  return (
    <PeerToPeerStyled>
      <Header name="header">
        <NavBar />
      </Header>
      <Container>
        <SubHeader>
          <div className="feature-card-title white">P2P</div>
        </SubHeader>
        <div className="content-row ">
          <PeerToPeerType>
            <TabWithLink active={depositType.toLowerCase()}>
              <TabPane name="Crypto" link="/p2p/crypto">
                <PeerToPeerTypeContainer>
                  <div className="content-column Input-container">
                    <CoinDropdown>
                      <div className="content-row">
                        <div
                          className="label white"
                          style={{ marginBottom: "-12px" }}
                        >
                          Coin
                        </div>
                      </div>
                      <Dropdown
                        style={{ marginTop: "12px" }}
                        active={curSymbol || "BTC"}
                        onChange={(e) => {
                          setCurSymbol(e);
                          setOrderParam({
                            ...orderParam,
                            currency: e,
                          });
                        }}
                        isSelect={true}
                        isHeightAuto={true}
                      >
                        {coinSymbol.map((data, index) => (
                          <DropdownChild name={data.currency} key={index}>
                            <div className="content-row align-items-end">
                              <div className="label white mgr-8">
                                {data.currency}
                              </div>
                              <div className="text-9 gray">
                                {data.currencyLongName}
                              </div>
                            </div>
                          </DropdownChild>
                        ))}
                      </Dropdown>
                    </CoinDropdown>
                    <div className="content-row space-between mgb-8">
                      <div className="label gray">Total balance:</div>
                      <div className="label white">
                        {BigNumber(
                          userWallet[CRYPTO_INDEX[curSymbol.toLowerCase()]]
                            .amount
                        ).toFormat(FORMAT_DECIMAL) +
                          " " +
                          curSymbol.toUpperCase()}
                      </div>
                    </div>
                    <div className="content-row space-between mgb-8">
                      <div className="label gray">Available balance:</div>
                      <div className="label white">
                        {BigNumber(
                          userWallet[CRYPTO_INDEX[curSymbol.toLowerCase()]]
                            .amount
                        ).toFormat(FORMAT_DECIMAL) +
                          " " +
                          curSymbol.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  <div className="content-row pic-container">
                    <div className="pic-overlay cypto"></div>
                  </div>
                </PeerToPeerTypeContainer>
              </TabPane>
            </TabWithLink>
          </PeerToPeerType>
          <PeerToPeerDetail
            onSubmit={(e) => {
              e.preventDefault();
              createOrder({
                variables: { input: orderParam },
              });
            }}
          >
            <div className="title white mgb-8">P2P detail</div>
            <Input
              title="UserID"
              placeholder="UserID"
              onChange={(e) =>
                setOrderParam({
                  ...orderParam,
                  targetUser: Number(e),
                })
              }
            />
            <Input
              title="Amount"
              suffix={curSymbol || "BTC"}
              value={cryptoAmount}
              onChange={(e) => {
                setCryptoAmount(e);
                setOrderParam({
                  ...orderParam,
                  amount: Number(e),
                });
              }}
            />
            <div className="content-row mgb-8">
              <div className="text-9 gray mgr-8">Available amount:</div>
              <div className="text-9 white">
                {BigNumber(
                  userWallet[CRYPTO_INDEX[curSymbol.toLowerCase()]].amount
                ).toFormat(FORMAT_DECIMAL)}{" "}
                {curSymbol || "USD"}
              </div>
            </div>
            <div className="content-row space-between mgb-8">
              <div className="label gray">The receiver will get:</div>
              <div className="label white">
                {BigNumber(cryptoAmount || 0).toFormat()} {curSymbol || "USD"}
              </div>
            </div>
            <Button
              style={{ marginTop: "16px" }}
              label="Submit"
              color="green"
              fontColor="black"
            />
          </PeerToPeerDetail>
        </div>
        <PeerToPeerHistory>
          <div className="title white mgb-16">P2P History</div>
          <div className="content-row space-between mgb-8">
            <div
              className="label gray text-center"
              style={{ minWidth: "96px" }}
            >
              Coin
            </div>
            <div
              className="label gray text-center"
              style={{ minWidth: "64px" }}
            >
              Status
            </div>
            <div
              className="label gray text-center"
              style={{ minWidth: "64px" }}
            >
              Amount
            </div>
            <div
              className="label gray text-center"
              style={{ minWidth: "126px" }}
            >
              Date
            </div>
            <div className="label gray" style={{ minWidth: "296px" }}>
              Infomation
            </div>
          </div>
          <HistoryContainer>
            {p2pHistory &&
              p2pHistory.map((items, index) => {
                if (items.method === "1")
                  return (
                    <div
                      className="content-row space-between mgb-8"
                      key={index}
                    >
                      <div
                        className="label white text-center"
                        style={{ minWidth: "96px" }}
                      >
                        {items.bank
                          ? items.bank.bank
                          : items.wallet.currency.currency}
                      </div>
                      <div
                        className={ClassNames(
                          "label text-center",
                          items.status === "0" ? "green" : "red"
                        )}
                        style={{ minWidth: "64px" }}
                      >
                        {items.status === "0" ? "success" : "cancle"}
                      </div>
                      <div
                        className="label white text-center"
                        style={{ minWidth: "64px" }}
                      >
                        {items.amount}
                      </div>
                      <div
                        className="label gray text-center"
                        style={{ minWidth: "126px" }}
                      >
                        {moment(items.updated_at).format("DD-MM HH:MM:SS")}
                      </div>
                      <div
                        className="label gray"
                        style={{ minWidth: "296px" }}
                      ></div>
                    </div>
                  );
              })}
          </HistoryContainer>
        </PeerToPeerHistory>
      </Container>
    </PeerToPeerStyled>
  );
};

export default PeerToPeerContainer;
