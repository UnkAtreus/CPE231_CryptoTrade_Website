import * as React from "react";
import { useEffect, useState } from "react";
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

const WithdrawContainer = ({ match, ...props }) => {
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
  const [bankAmount, setBankAmount] = useState();

  const withdrawType = match.params.type
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
    <WithdrawStyled>
      <Header name="header">
        <NavBar />
      </Header>
      <Container>
        <SubHeader>
          <div className="feature-card-title white">Withdraw</div>
        </SubHeader>
        <div className="content-row mgb-8">
          <WithdrawType>
            <TabWithLink active={withdrawType.toLowerCase()}>
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
                        onChange={(e) => {}}
                        active={"Bank account"}
                      >
                        <RadioChild name="Bank account"></RadioChild>
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
                </WithdrawTypeContainer>
              </TabPane>
            </TabWithLink>
          </WithdrawType>
          <WithdrawDetail>
            {withdrawType === "fiat" ? (
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
                    {BigNumber(bankAmount || 0).toFormat()} USDT
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
                <div className="title white mgb-8">Withdrawal info</div>
                <Input
                  title={"Recipient's " + curSymbol + " Address"}
                  placeholder={curSymbol + " Address"}
                  value={""}
                  onChange={(e) => {
                    console.log(e);
                  }}
                />
                <Input
                  title="Amount"
                  suffix={curSymbol || "USD"}
                  value={bankAmount}
                  onChange={(e) => {
                    setBankAmount(e);
                  }}
                />
                <div className="content-row mgb-8">
                  <div className="text-9 gray mgr-8">Available amount:</div>
                  <div className="text-9 white">
                    {BigNumber(
                      MOCK_USER_CURRENCY[curSymbol.toLowerCase()]
                    ).toFormat(FORMAT_DECIMAL) +
                      " " +
                      curSymbol}
                  </div>
                </div>
                <div className="content-row space-between mgb-8">
                  <div className="label gray">Transaction Fee: </div>
                  <div className="label white">0.0005 {curSymbol}</div>
                </div>
                <div className="content-row space-between mgb-8">
                  <div className="label gray">The receiver will get:</div>
                  <div className="label white">
                    {BigNumber(bankAmount - 0.0005 || 0).isNegative()
                      ? 0
                      : BigNumber(bankAmount - 0.0005 || 0).toFormat(
                          4,
                          FORMAT_DECIMAL
                        )}{" "}
                    {curSymbol}
                  </div>
                </div>
                <Button
                  style={{ marginTop: "16px" }}
                  label="Submit"
                  color="green"
                  fontColor="black"
                />
              </>
            )}
          </WithdrawDetail>
        </div>
        <WithdrawHistory>
          <div className="title white mgb-16">Withdraw History</div>
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
        </WithdrawHistory>
      </Container>
    </WithdrawStyled>
  );
};

export default WithdrawContainer;
