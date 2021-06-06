import * as React from "react";
import { useEffect, useState } from "react";
import ClassNames from "classnames";
import {
  DeopsitStyled,
  Header,
  SubHeader,
  DepositType,
  DepositDetail,
  DepositTypeContainer,
  CoinDropdown,
  DepositHistory,
  PaymentSelected,
  HistoryContainer,
} from "./styled";
import {
  Container,
  Dropdown,
  DropdownChild,
  Radio,
  RadioChild,
  Button,
  Input,
  NavBar,
  TabWithLink,
  TabPane,
} from "components";
import { useQuery, useMutation, gql } from "@apollo/client";
import BigNumber from "bignumber.js";
import { num_list_month, num_list_year } from "helpers/constants/numList";
import { MOCK_WALLET, CRYPTO_INDEX } from "helpers";
import moment from "moment";
import sortArray from "sort-array";
import QRCode from "qrcode.react";

const DeopsitContainer = ({ match, ...props }) => {
  const depositType = match.params.type
    ? match.params.type.toLowerCase()
    : "crypto";
  const [coinSymbol, setCoinSymbol] = useState([
    {
      currencyShortName: "BTC",
      currency: "Bitcoin",
    },
  ]);
  const [curSymbol, setCurSymbol] = useState(
    match.params.type.toLowerCase() === "fiat" ? "USD" : "BTC"
  );
  const [selectBank, setSelectBank] = useState("KBANK");

  const [monthExpiry, setMonthExpiry] = useState("1");
  const [yearExpiry, setYearExpiry] = useState("21");
  const [amount, setAmount] = useState(0);
  const [payMentMethod, setPayMentMethod] = useState("Bank account");
  const [bankType, setBankType] = useState([
    {
      bank: "KBANK",
    },
  ]);
  const [allCard, setAllCard] = useState([]);
  const [isNewCard, setIsNewCard] = useState(allCard === [] ? true : false);
  const [hasCard, setHasNewCard] = useState(false);
  const [cardNum, setCardNum] = useState("0");
  const [userWallet, setUserWallet] = useState(MOCK_WALLET);
  const [withdrawHistoryFiat, setWithdrawHistoryFiat] = useState([]);
  const [withdrawHistoryCrypto, setWithdrawHistoryCrypto] = useState([]);
  const [bankAmount, setBankAmount] = useState(0);
  const [orderParam, setOrderParam] = useState({
    method: 0,
    amount: 0,
    bankNumber: "",
    bankType: "",
    cardInput: {
      cardNumber: "",
    },
  });
  const [cardParam, setCardParam] = useState({
    cardNumber: "0",
    expiredMonth: "01",
    expiredYear: "21",
    cvv: "000",
    cardName: "",
  });

  const MOCK_FIAT = [
    {
      currencyShortName: "USD",
      currency: "US Dollar",
    },
    // {
    //   currencyShortName: "THB",
    //   currency: "Thai Bath",
    // },
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
      getUserWalletByToken {
        amount
        inOrder
        currency {
          currency
          currencyLongName
        }
      }
      getAllFiatByUser {
        user {
          email
          firstName
        }
        bank {
          banktype {
            bank
          }
        }
        creditCard {
          cardNumber
        }
        method
        status
        amount
        updated_at
        created_at
      }
      getAllCryptoByUser {
        user {
          email
          firstName
        }
        wallet {
          currency {
            currency
          }
        }
        method
        status
        amount
        updated_at
        created_at
      }
      getAllBank {
        bank
      }
      getCardByToken {
        id
        cardNumber
        user {
          email
        }
      }
    }
  `;

  const CREATE_ORDER = gql`
    mutation ($input: FiatInput!) {
      createFiat(fiatInput: $input) {
        bank {
          banktype {
            bank
          }
        }
        creditCard {
          cardNumber
        }
        wallet {
          amount
        }
      }
    }
  `;
  const CREATE_CARD = gql`
    mutation ($input: CardInput!) {
      addCard(cardInput: $input) {
        user {
          email
        }
        cardNumber
        expiredMonth
        expiredYear
        cvv
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery(GET_ALL_SYMBOL);

  const [createOrder] = useMutation(CREATE_ORDER, {
    onCompleted(order) {
      if (order) {
        console.log(order);
        setAmount(0);
        refetch();
      }
    },
  });

  const [createCard] = useMutation(CREATE_CARD, {
    onCompleted(card) {
      if (card) {
        console.log(card);
        setIsNewCard(false);
        setHasNewCard(false);
        refetch();
      }
    },
  });

  const sortHistory = (fiat, crypto) => {
    var concat_array = fiat.concat(crypto);

    var sort = sortArray(concat_array, {
      by: "created_at",
      order: "desc",
    });
    return sort;
  };

  const getTotal = (flag) => {
    return (
      Number(userWallet[CRYPTO_INDEX[flag]].amount) +
      Number(userWallet[CRYPTO_INDEX[flag]].inOrder)
    );
  };

  useEffect(() => {
    if (data && data.getAllCurrencyWithNoStatic) {
      setCoinSymbol(data.getAllCurrencyWithNoStatic);
    }
    if (data && data.getUserWalletByToken) {
      setUserWallet(data.getUserWalletByToken);
    }
    if (data && data.getAllFiatByUser) {
      setWithdrawHistoryFiat(data.getAllFiatByUser);
    }
    if (data && data.getAllCryptoByUser) {
      setWithdrawHistoryCrypto(data.getAllCryptoByUser);
    }
    if (data && data.getAllBank) {
      setBankType(data.getAllBank);
    }
    if (data && data.getCardByToken) {
      setAllCard(data.getCardByToken);
    }
  }, [data]);

  useEffect(() => {
    if (payMentMethod === "Bank account")
      setOrderParam({
        ...orderParam,
        bankType: "KBANK",
        bankNumber: "",
        cardInput: {
          cardNumber: "",
        },
      });
    else if (payMentMethod === "Cradit / Dabit card")
      if (isNewCard)
        setOrderParam({
          ...orderParam,
          bankType: "",
          bankNumber: "",
          cardInput: {
            cardNumber: "",
          },
        });
      else if (allCard !== [])
        setOrderParam({
          ...orderParam,
          bankType: "",
          bankNumber: "",
          cardInput: {
            cardNumber: allCard[0].cardNumber,
          },
        });
      else
        setOrderParam({
          ...orderParam,
          bankType: "",
          bankNumber: "",
          cardInput: {
            cardNumber: "",
          },
        });
  }, [payMentMethod, isNewCard]);

  return (
    <DeopsitStyled>
      <Header name="header">
        <NavBar />
      </Header>
      <Container>
        <SubHeader>
          <div className="feature-card-title white">Deposit</div>
        </SubHeader>
        <div className="content-row">
          <DepositType>
            <TabWithLink active={depositType.toLowerCase()}>
              <TabPane name="Crypto" link="/deposit/crypto">
                <DepositTypeContainer>
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
                        onChange={setCurSymbol}
                        isSelect={true}
                        isHeightAuto={true}
                      >
                        {coinSymbol.map((data, index) => {
                          return (
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
                          );
                        })}
                      </Dropdown>
                    </CoinDropdown>
                    <div className="content-row space-between mgb-8">
                      <div className="label gray">Total balance:</div>
                      <div className="label white">
                        {BigNumber(getTotal(curSymbol.toLowerCase())).toFormat(
                          FORMAT_DECIMAL
                        ) +
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
                </DepositTypeContainer>
              </TabPane>
              <TabPane name="Fiat" link="/deposit/fiat">
                <DepositTypeContainer>
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
                        active={curSymbol || "USD"}
                        onChange={setCurSymbol}
                        isSelect={true}
                        isHeightAuto={true}
                      >
                        {MOCK_FIAT.map((data, index) => (
                          <DropdownChild
                            name={data.currencyShortName}
                            key={index}
                          >
                            <div className="content-row align-items-end">
                              <div className="label white mgr-8">
                                {data.currencyShortName}
                              </div>
                              <div className="text-9 gray">{data.currency}</div>
                            </div>
                          </DropdownChild>
                        ))}
                      </Dropdown>
                    </CoinDropdown>
                    <PaymentSelected>
                      <div className="content-row">
                        <div className="label white">Payment Method</div>
                      </div>
                      <Radio
                        position="column"
                        gap={8}
                        onChange={setPayMentMethod}
                        active={"Bank account"}
                      >
                        <RadioChild name="Bank account"></RadioChild>
                        <RadioChild name="Cradit / Dabit card"></RadioChild>
                      </Radio>
                    </PaymentSelected>
                    <div className="content-row space-between mgb-8">
                      <div className="label gray">Total balance:</div>
                      <div className="label white">
                        {BigNumber(getTotal("usdt")).toFormat(FORMAT_DECIMAL)}{" "}
                        USDT
                      </div>
                    </div>
                    <div className="content-row space-between mgb-8">
                      <div className="label gray">Available balance:</div>
                      <div className="label white">
                        {BigNumber(
                          userWallet[CRYPTO_INDEX["usdt"]].amount
                        ).toFormat(FORMAT_DECIMAL)}{" "}
                        USDT
                      </div>
                    </div>
                  </div>
                  <div className="content-row pic-container">
                    <div className="pic-overlay fiat"></div>
                  </div>
                </DepositTypeContainer>
              </TabPane>
            </TabWithLink>
          </DepositType>
          <DepositDetail>
            {depositType === "fiat" ? (
              payMentMethod === "Bank account" ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log(orderParam);
                    createOrder({
                      variables: { input: orderParam },
                    });
                  }}
                >
                  <div className="title white mgb-8">Payment details</div>
                  <Input
                    title="Amount"
                    suffix={curSymbol || "USD"}
                    value={bankAmount}
                    onChange={(e) => {
                      setBankAmount(e);
                      setOrderParam({
                        ...orderParam,
                        amount: Number(e),
                      });
                    }}
                  ></Input>
                  <div className="content-row space-between mgb-8">
                    <div className="label gray">Fee:</div>
                    <div className="label white">0 {curSymbol || "USD"}</div>
                  </div>
                  <div className="content-row space-between mgb-8">
                    <div className="label gray">You will get:</div>
                    <div className="label white">
                      {BigNumber(bankAmount).toFormat()} USDT
                    </div>
                  </div>
                  <CoinDropdown>
                    <div className="content-row">
                      <div
                        className="label white"
                        style={{ marginBottom: "-12px" }}
                      >
                        Bank Type
                      </div>
                    </div>
                    <Dropdown
                      style={{ marginTop: "12px" }}
                      active={selectBank || "KBANK"}
                      onChange={(e) => {
                        setSelectBank(e);
                        setOrderParam({
                          ...orderParam,
                          bankType: e,
                          cardInput: {
                            cardNumber: "",
                          },
                        });
                      }}
                      isSelect={true}
                      isHeightAuto={true}
                    >
                      {bankType.map((data, index) => (
                        <DropdownChild name={data.bank} key={index}>
                          <div className="content-row align-items-end">
                            <div className="label white mgr-8">{data.bank}</div>
                          </div>
                        </DropdownChild>
                      ))}
                    </Dropdown>
                  </CoinDropdown>
                  <Input
                    title="Bank Number"
                    placeholder="xxx-xxxx-xxxx-x"
                    onChange={(e) => {
                      setOrderParam({
                        ...orderParam,
                        bankNumber: e,
                        cardInput: {
                          cardNumber: "",
                        },
                      });
                    }}
                  ></Input>
                  <Button
                    style={{ marginTop: "16px" }}
                    label="Submit"
                    color="green"
                    fontColor="black"
                    onClick={() => {}}
                  />
                </form>
              ) : (
                <>
                  {isNewCard ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        console.log(cardParam);
                        console.log(orderParam);
                        createCard({
                          variables: { input: cardParam },
                        });
                        createOrder({
                          variables: { input: orderParam },
                        });
                      }}
                    >
                      <div className="content-row space-between">
                        <div className="title white mgb-8">Payment details</div>
                        {hasCard && (
                          <div
                            className="label gray mgb-8 pointer"
                            style={{ alignSelf: "flex-end" }}
                            onClick={() => {
                              setIsNewCard(false);
                              setHasNewCard(false);
                            }}
                          >
                            select card
                          </div>
                        )}
                      </div>
                      <Input
                        title="Amount"
                        suffix={curSymbol || "USD"}
                        value={amount || 0}
                        onChange={(e) => {
                          setAmount(e);
                          setOrderParam({
                            ...orderParam,
                            amount: Number(e),
                          });
                        }}
                      ></Input>
                      <Input
                        title="Card Number"
                        placeholder="xxxx xxxx xxxx xxxx"
                        onChange={(e) => {
                          setCardParam({
                            ...cardParam,
                            cardNumber: e,
                          });
                          setOrderParam({
                            ...orderParam,
                            bankType: "",
                            bankNumber: "",
                            cardInput: {
                              cardNumber: e,
                            },
                          });
                        }}
                      ></Input>
                      <Input
                        title="Card Holder's Name"
                        placeholder="Name"
                        onChange={(e) => {
                          setCardParam({
                            ...cardParam,
                            cardName: e,
                          });
                        }}
                      ></Input>
                      <div className="content-row">
                        <div style={{ marginRight: "8px", width: "200px" }}>
                          <div className="content-row">
                            <div
                              className="label white"
                              style={{ marginBottom: "-12px" }}
                            >
                              Card Expiry Date
                            </div>
                          </div>
                          <CoinDropdown>
                            <div className="inline-flex">
                              <Dropdown
                                style={{ marginTop: "12px" }}
                                active={monthExpiry}
                                onChange={(e) => {
                                  setMonthExpiry(e);
                                  setCardParam({
                                    ...cardParam,
                                    expiredMonth: e,
                                  });
                                }}
                                isSelect={true}
                              >
                                {num_list_month.map((data, index) => {
                                  return (
                                    <DropdownChild name={data} key={index}>
                                      <div className="content-row align-items-end">
                                        <div className="label white mgr-8">
                                          {data}
                                        </div>
                                      </div>
                                    </DropdownChild>
                                  );
                                })}
                              </Dropdown>
                              <Dropdown
                                style={{ marginTop: "12px" }}
                                active={yearExpiry}
                                onChange={(e) => {
                                  setYearExpiry(e);
                                  setCardParam({
                                    ...cardParam,
                                    expiredYear: e,
                                  });
                                }}
                                isSelect={true}
                              >
                                {num_list_year.map((data, index) => {
                                  return (
                                    <DropdownChild name={data} key={index}>
                                      <div className="content-row align-items-end">
                                        <div className="label white mgr-8">
                                          {data}
                                        </div>
                                      </div>
                                    </DropdownChild>
                                  );
                                })}
                              </Dropdown>
                            </div>
                          </CoinDropdown>
                        </div>
                        <Input
                          title="CVV"
                          placeholder="***"
                          onChange={(e) => {
                            setCardParam({
                              ...cardParam,
                              cvv: e,
                            });
                          }}
                        ></Input>
                      </div>
                      <Button
                        label="Submit"
                        color="green"
                        fontColor="black"
                        onClick={() => {}}
                      />
                    </form>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        console.log(orderParam);
                        createOrder({
                          variables: { input: orderParam },
                        });
                      }}
                    >
                      <div className="content-row space-between">
                        <div className="title white mgb-8">Payment details</div>
                        {hasCard && (
                          <div
                            className="label gray mgb-8 pointer"
                            style={{ alignSelf: "flex-end" }}
                            onClick={() => {
                              setIsNewCard(false);
                              setHasNewCard(false);
                            }}
                          >
                            select card
                          </div>
                        )}
                      </div>
                      <Input
                        title="Amount"
                        suffix={curSymbol || "USD"}
                        value={amount || 0}
                        onChange={(e) => {
                          setAmount(e);
                          setOrderParam({
                            ...orderParam,
                            amount: Number(e),
                          });
                        }}
                      ></Input>
                      <CoinDropdown>
                        <div className="content-row space-between">
                          <div
                            className="label white"
                            style={{ marginBottom: "-12px" }}
                          >
                            Card Selected
                          </div>
                          <div
                            className="label gray pointer"
                            style={{ marginBottom: "-12px" }}
                            onClick={() => {
                              setIsNewCard(true);
                              setHasNewCard(true);
                            }}
                          >
                            +Add card
                          </div>
                        </div>
                        <Dropdown
                          style={{ marginTop: "12px" }}
                          active={cardNum}
                          onChange={(e) => {
                            setCardNum(e);
                            setOrderParam({
                              ...orderParam,
                              cardInput: {
                                cardNumber: allCard[e].cardNumber,
                              },
                              bankType: "",
                              bankNumber: "",
                            });
                          }}
                          isSelect={true}
                          isHeightAuto={true}
                        >
                          {allCard.map((data, index) => (
                            <DropdownChild name={index} key={index}>
                              <div className="content-row align-items-end">
                                <div className="label white mgr-8">
                                  {data.cardNumber}
                                </div>
                              </div>
                            </DropdownChild>
                          ))}
                        </Dropdown>
                      </CoinDropdown>
                      <Button
                        label="Submit"
                        color="green"
                        fontColor="black"
                        onClick={() => {}}
                      />
                    </form>
                  )}
                </>
              )
            ) : (
              <>
                <div className="title white mgb-24">Deposit network</div>
                <div className="content-column">
                  <div className="content-row justify-content-center mgb-24">
                    <div className="paragraph white">{curSymbol} Address</div>
                  </div>
                  <div className="content-row justify-content-center mgb-24">
                    <div className="content-row justify-content-center align-items-center qr-container">
                      <QRCode value={curSymbol} />
                    </div>
                  </div>
                  <div className="content-row justify-content-center">
                    <div className="label white">
                      1DMjCv8EV97w1m3EvjLpm6u7sTaAj1GV7s
                    </div>
                  </div>
                </div>
              </>
            )}
          </DepositDetail>
        </div>
        <DepositHistory>
          <div className="title white mgb-16">Deposit History</div>
          <div className="content-row space-between mgb-8">
            <div
              className="label gray text-center"
              style={{ minWidth: "96px" }}
            >
              Coin/Type
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
            {sortHistory(withdrawHistoryFiat, withdrawHistoryCrypto) &&
              sortHistory(withdrawHistoryFiat, withdrawHistoryCrypto).map(
                (items, index) => {
                  if (items.method === "0")
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
                            ? items.bank.banktype.bank
                            : items.wallet
                            ? items.wallet.currency.currency
                            : items.creditCard
                            ? "CraditCard"
                            : ""}
                        </div>
                        <div
                          className={ClassNames(
                            "label text-center",
                            items.status === "1" ? "green" : "red"
                          )}
                          style={{ minWidth: "64px" }}
                        >
                          {items.status === "1" ? "success" : "cancle"}
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
                          {moment(items.updated_at).format("DD-MM HH:mm:ss")}
                        </div>
                        <div
                          className="label gray"
                          style={{ minWidth: "296px" }}
                        ></div>
                      </div>
                    );
                }
              )}
          </HistoryContainer>
        </DepositHistory>
      </Container>
    </DeopsitStyled>
  );
};

export default DeopsitContainer;
