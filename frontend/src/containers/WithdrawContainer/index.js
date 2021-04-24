import * as React from "react";
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
  Tab,
  TabPane,
} from "components";

const WithdrawContainer = ({ match, ...props }) => {
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
            <Tab>
              <TabPane name="Cypto">
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
                      <Dropdown style={{ marginTop: "12px" }}>
                        <DropdownChild name={"BTC"}>
                          <div className="content-row align-items-end">
                            <div className="label white mgr-8">BTC</div>
                            <div className="text-9 gray">Bitcoin</div>
                          </div>
                        </DropdownChild>
                      </Dropdown>
                    </CoinDropdown>
                    <div className="content-row space-between mgb-8">
                      <div className="label gray">Total balance:</div>
                      <div className="label white">0.00014145 BTC</div>
                    </div>
                    <div className="content-row space-between mgb-8">
                      <div className="label gray">Available balance:</div>
                      <div className="label white">0.00014145 BTC</div>
                    </div>
                  </div>
                  <div className="content-row pic-container">
                    <div className="pic-overlay cypto"></div>
                  </div>
                </WithdrawTypeContainer>
              </TabPane>
              <TabPane name="Fiat">
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
                      <Dropdown style={{ marginTop: "12px" }}>
                        <DropdownChild name={"USD"}>
                          <div className="content-row align-items-end">
                            <div className="label white mgr-8">USD</div>
                            <div className="text-9 gray">US Dolla</div>
                          </div>
                        </DropdownChild>
                      </Dropdown>
                    </CoinDropdown>
                    <PaymentSelected>
                      <div className="content-row">
                        <div className="label white">Payment Method</div>
                      </div>
                      <Radio position="column">
                        <RadioChild name="Bank account"></RadioChild>
                      </Radio>
                    </PaymentSelected>
                    <div className="content-row space-between mgb-8">
                      <div className="label gray">Total balance:</div>
                      <div className="label white">1000.0000 USDT</div>
                    </div>
                    <div className="content-row space-between mgb-8">
                      <div className="label gray">Available balance:</div>
                      <div className="label white">1000.0000 USDT</div>
                    </div>
                  </div>
                  <div className="content-row pic-container">
                    <div className="pic-overlay fiat"></div>
                  </div>
                </WithdrawTypeContainer>
              </TabPane>
            </Tab>
          </WithdrawType>
          <WithdrawDetail>
            <div className="title white mgb-8">Withdrawal info</div>
            <Input title="Recipient's BTC Address" placeholder="BTC Address" />
            <Input title="Amount" suffix="BTC" />
            <div className="content-row mgb-8">
              <div className="text-9 gray mgr-8">Available amount:</div>
              <div className="text-9 white">0.00014145 BTC</div>
            </div>
            <div className="content-row space-between mgb-8">
              <div className="label gray">Transaction Fee: </div>
              <div className="label white">0.0005 BTC</div>
            </div>
            <div className="content-row space-between mgb-8">
              <div className="label gray">The receiver will get:</div>
              <div className="label white">0.00000000 BTC</div>
            </div>
            <Button
              style={{ marginTop: "16px" }}
              label="Submit"
              color="green"
              fontColor="black"
            />
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
