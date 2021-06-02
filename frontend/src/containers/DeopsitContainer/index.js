import * as React from "react";
import { useEffect, useState } from "react";
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
import { useQuery, gql } from "@apollo/client";
import BigNumber from "bignumber.js";
import { num_list } from "helpers/constants/numList";

const DeopsitContainer = ({ match, ...props }) => {
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
  const [monthExpiry, setMonthExpiry] = useState("1");
  const [yearExpiry, setYearExpiry] = useState("21");
  const [payMentMethod, setPayMentMethod] = useState("Bank account");
  const [bankAmount, setBankAmount] = useState(0);

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
    }
  `;

  const { loading, error, data } = useQuery(GET_ALL_SYMBOL);

  useEffect(() => {
    if (data && data.getAllCurrencyWithNoStatic) {
      setCoinSymbol(data.getAllCurrencyWithNoStatic);
    }
  }, [data]);

  return (
    <DeopsitStyled>
      <Header name="header">
        <NavBar />
      </Header>
      <Container>
        <SubHeader>
          <div className="feature-card-title white">Deposit</div>
        </SubHeader>
        <div className="content-row mgb-8">
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
                          MOCK_USER_CURRENCY[curSymbol.toLowerCase()]
                        ).toFormat(FORMAT_DECIMAL) +
                          " " +
                          curSymbol.toUpperCase()}
                      </div>
                    </div>
                    <div className="content-row space-between mgb-8">
                      <div className="label gray">Available balance:</div>
                      <div className="label white">
                        {BigNumber(
                          MOCK_USER_CURRENCY[curSymbol.toLowerCase()]
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
                        {BigNumber(MOCK_USER_CURRENCY["usdt"]).toFormat(
                          FORMAT_DECIMAL
                        )}{" "}
                        USDT
                      </div>
                    </div>
                    <div className="content-row space-between mgb-8">
                      <div className="label gray">Available balance:</div>
                      <div className="label white">
                        {BigNumber(MOCK_USER_CURRENCY["usdt"]).toFormat(
                          FORMAT_DECIMAL
                        )}{" "}
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
                <>
                  <div className="title white mgb-8">Payment details</div>
                  <Input
                    title="Amount"
                    suffix={curSymbol || "USD"}
                    value={bankAmount}
                    onChange={(e) => {
                      setBankAmount(e);
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
                      active="Kbank"
                      onChange={(e) => {
                        console.log(e);
                      }}
                      isSelect={true}
                      isHeightAuto={true}
                    >
                      <DropdownChild name={"Kbank"}>
                        <div className="content-row align-items-end">
                          <div className="label white mgr-8">Kbank</div>
                        </div>
                      </DropdownChild>
                    </Dropdown>
                  </CoinDropdown>
                  <Input
                    title="Bank Number"
                    placeholder="xxx-xxxx-xxxx-x"
                    onChange={(e) => {
                      console.log(e);
                    }}
                  ></Input>
                  <Button
                    style={{ marginTop: "16px" }}
                    label="Submit"
                    color="green"
                    fontColor="black"
                  />
                </>
              ) : (
                <>
                  <div className="title white mgb-8">Payment details</div>
                  <Input
                    title="Amount"
                    suffix={curSymbol || "USD"}
                    value={"0"}
                    onChange={(e) => {
                      console.log(e);
                    }}
                  ></Input>
                  <Input
                    title="Card Number"
                    placeholder="xxxx xxxx xxxx xxxx"
                    onChange={(e) => {
                      console.log(e);
                    }}
                  ></Input>
                  <Input
                    title="Card Holder's Name"
                    placeholder="Name"
                    onChange={(e) => {
                      console.log(e);
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
                            onChange={setMonthExpiry}
                            isSelect={true}
                          >
                            {num_list.map((data, index) => {
                              if (index < 12)
                                return (
                                  <DropdownChild name={data}>
                                    <div className="content-row align-items-end">
                                      <div className="label white mgr-8">
                                        {data}
                                      </div>
                                    </div>
                                  </DropdownChild>
                                );
                              else return 0;
                            })}
                          </Dropdown>
                          <Dropdown
                            style={{ marginTop: "12px" }}
                            active={yearExpiry}
                            onChange={setYearExpiry}
                            isSelect={true}
                          >
                            {num_list.map((data, index) => {
                              if (index > 19)
                                return (
                                  <DropdownChild name={data}>
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
                        console.log(e);
                      }}
                    ></Input>
                  </div>
                  <Button label="Submit" color="green" fontColor="black" />
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
                    <div className="qr-container"></div>
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
              style={{ minWidth: "64px" }}
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
        </DepositHistory>
      </Container>
    </DeopsitStyled>
  );
};

export default DeopsitContainer;
