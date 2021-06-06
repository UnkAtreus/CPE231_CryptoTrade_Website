import * as React from "react";
import { useEffect, useState } from "react";
import ClassNames from "classnames";
import {
  WithdrawStyled,
  Header,
  SubHeader,
  WithdrawType,
  WithdrawDetail,
  WithdrawTypeContainer,
  CoinDropdown,
  WithdrawHistory,
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
import sortArray from "sort-array";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";

import { MOCK_WALLET, CRYPTO_INDEX } from "helpers";

const WithdrawContainer = ({ match, ...props }) => {
  const [coinSymbol, setCoinSymbol] = useState([
    {
      __typename: "Currency",
      currencyShortName: "BTC",
      currency: "Bitcoin",
    },
  ]);
  const [curSymbol, setCurSymbol] = useState(
    match.params.type.toLowerCase() === "fiat" ? "usd" : "btc"
  );

  const [payMentMethod, setPayMentMethod] = useState("Bank account");
  const [bankAmount, setBankAmount] = useState();
  const [userWallet, setUserWallet] = useState(MOCK_WALLET);
  const [bankType, setBankType] = useState([
    {
      bank: "KBANK",
    },
  ]);
  const [withdrawHistoryFiat, setWithdrawHistoryFiat] = useState([]);
  const [withdrawHistoryCrypto, setWithdrawHistoryCrypto] = useState([]);
  const [withdrawType, setWithdrawType] = useState(
    match.params.type.toLowerCase() === "fiat" ? "fiat" : "crypto"
  );

  const [orderParamCrypto, setOrderParamCrypto] = useState({
    method: 1,
    amount: 0,
    targetWallet: "",
    shortName: "BTC",
  });
  const [orderParamFiat, setOrderParamFiat] = useState({
    method: 1,
    amount: 0,
    bankNumber: "",
    bankType: "KBANK",
    cardInput: {
      cardNumber: "",
    },
  });
  const [selectBank, setSelectBank] = useState("KBANK");

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
    }
  `;

  const CREATE_ORDER_FIAT = gql`
    mutation ($inputFiat: FiatInput!) {
      createFiat(fiatInput: $inputFiat) {
        user {
          email
          firstName
        }
        bank {
          banktype {
            bank
          }
        }
        status
        amount
        updated_at
      }
    }
  `;

  const CREATE_ORDER = gql`
    mutation ($input: CryptoInput!) {
      createTransCrypto(cryptoInput: $input) {
        user {
          email
          firstName
        }
        wallet {
          currency {
            currency
          }
        }
        status
        amount
        updated_at
      }
    }
  `;

  const notify = (isSuccess) => {
    if (isSuccess) {
      toast.success("Success ✔", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Failed ❌", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const { loading, error, data, refetch } = useQuery(GET_ALL_SYMBOL);

  const [createOrderCrypto] = useMutation(CREATE_ORDER, {
    onCompleted(order) {
      if (order) {
        console.log(order);
        notify(true);
        refetch();
      } else {
        notify(false);
      }
    },
  });

  const [createOrderFiat] = useMutation(CREATE_ORDER_FIAT, {
    onCompleted(order) {
      if (order) {
        console.log(order);
        notify(true);
        refetch();
      } else {
        notify(false);
      }
    },
  });

  const getTotal = (flag) => {
    return (
      Number(userWallet[CRYPTO_INDEX[flag]].amount) +
      Number(userWallet[CRYPTO_INDEX[flag]].inOrder)
    );
  };

  const setURLType = (symbol) => {
    console.log(symbol);
    switch (symbol) {
      case "crypto":
        setWithdrawType("crypto");
        setCurSymbol("btc");
        break;
      case "fiat":
        setWithdrawType("fiat");
        setCurSymbol("usd");
        break;
      default:
        setWithdrawType("crypto");
        setCurSymbol("btc");
        break;
    }
  };

  const sortHistory = (fiat, crypto) => {
    var concat_array = fiat.concat(crypto);
    console.log(concat_array);

    var sort = sortArray(concat_array, {
      by: "created_at",
      order: "desc",
    });
    return sort;
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
  }, [data]);

  useEffect(() => {
    setURLType(match.params.type.toLowerCase());
  }, []);

  return (
    <WithdrawStyled>
      <Header name="header">
        <NavBar />
      </Header>
      <Container>
        <SubHeader>
          <div className="feature-card-title white">Withdraw</div>
        </SubHeader>
        <div className="content-row">
          <WithdrawType>
            <TabWithLink active={withdrawType}>
              <TabPane name="Crypto" link="/withdraw/crypto">
                <WithdrawTypeContainer>
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
                        active={curSymbol.toUpperCase() || "BTC"}
                        onChange={(e) => {
                          setCurSymbol(e.toLowerCase());
                          setOrderParamCrypto({
                            ...orderParamCrypto,
                            shortName: e,
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
                        {BigNumber(getTotal(curSymbol)).toFormat(
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
                          userWallet[CRYPTO_INDEX[curSymbol]].amount
                        ).toFormat(FORMAT_DECIMAL) +
                          " " +
                          curSymbol.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  <div className="content-row pic-container">
                    <div className="pic-overlay cypto"></div>
                  </div>
                </WithdrawTypeContainer>
              </TabPane>
              <TabPane name="Fiat" link="/withdraw/fiat">
                <WithdrawTypeContainer>
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
                        active={curSymbol.toUpperCase() || "USD"}
                        onChange={(e) => setCurSymbol(e.toLowerCase())}
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
                        onChange={(e) => {
                          console.log(userWallet);
                        }}
                        active={"Bank account"}
                      >
                        <RadioChild name="Bank account"></RadioChild>
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
                </WithdrawTypeContainer>
              </TabPane>
            </TabWithLink>
          </WithdrawType>
          <WithdrawDetail>
            {withdrawType === "fiat" ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log(orderParamFiat);
                  createOrderFiat({
                    variables: { inputFiat: orderParamFiat },
                  });
                }}
              >
                <div className="title white mgb-8">Payment details</div>
                <Input
                  title="Amount"
                  suffix={curSymbol.toUpperCase() || "USD"}
                  value={bankAmount}
                  onChange={(e) => {
                    setBankAmount(e);
                    setOrderParamFiat({
                      ...orderParamFiat,
                      amount: Number(e),
                    });
                  }}
                ></Input>
                <div className="content-row space-between mgb-8">
                  <div className="label gray">Fee:</div>
                  <div className="label white">0.001 %</div>
                </div>
                <div className="content-row space-between mgb-8">
                  <div className="label gray">You will get:</div>
                  <div className="label white">
                    {BigNumber(bankAmount * 0.999 || 0).toFormat()} USDT
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
                      setOrderParamFiat({
                        ...orderParamFiat,
                        bankType: e,
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
                    setOrderParamFiat({
                      ...orderParamFiat,
                      bankNumber: e,
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
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log(orderParamCrypto);
                  createOrderCrypto({
                    variables: { input: orderParamCrypto },
                  });
                }}
              >
                <div className="title white mgb-8">Withdraw info</div>
                <Input
                  title={"Recipient's " + curSymbol.toUpperCase() + " Address"}
                  placeholder={curSymbol.toUpperCase() + " Address"}
                  value={""}
                  onChange={(e) => {
                    setOrderParamCrypto({
                      ...orderParamCrypto,
                      targetWallet: e,
                    });
                  }}
                />
                <Input
                  title="Amount"
                  suffix={curSymbol.toUpperCase() || "USD"}
                  value={bankAmount}
                  onChange={(e) => {
                    setBankAmount(e);
                    setOrderParamCrypto({
                      ...orderParamCrypto,
                      amount: Number(e),
                    });
                  }}
                />
                <div className="content-row mgb-8">
                  <div className="text-9 gray mgr-8">Available amount:</div>
                  <div className="text-9 white">
                    {BigNumber(
                      userWallet[CRYPTO_INDEX[curSymbol]].amount
                    ).toFormat(FORMAT_DECIMAL) +
                      " " +
                      curSymbol.toUpperCase()}
                  </div>
                </div>
                <div className="content-row space-between mgb-8">
                  <div className="label gray">Transaction Fee: </div>
                  <div className="label white">0.001 %</div>
                </div>
                <div className="content-row space-between mgb-8">
                  <div className="label gray">The receiver will get:</div>
                  <div className="label white">
                    {BigNumber(bankAmount * 0.999 || 0).isNegative()
                      ? 0
                      : BigNumber(bankAmount * 0.999 || 0).toFormat(
                          4,
                          FORMAT_DECIMAL
                        )}{" "}
                    {curSymbol.toUpperCase()}
                  </div>
                </div>
                <Button
                  style={{ marginTop: "16px" }}
                  label="Submit"
                  color="green"
                  fontColor="black"
                  onClick={() => {}}
                />
              </form>
            )}
          </WithdrawDetail>
        </div>
        <WithdrawHistory>
          <div className="title white mgb-16">Withdraw History</div>
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
            {sortHistory(withdrawHistoryFiat, withdrawHistoryCrypto) &&
              sortHistory(withdrawHistoryFiat, withdrawHistoryCrypto).map(
                (items, index) => {
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
                            ? items.bank.banktype.bank
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
        </WithdrawHistory>
      </Container>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </WithdrawStyled>
  );
};

export default WithdrawContainer;
