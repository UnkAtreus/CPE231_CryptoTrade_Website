import * as React from "react";
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
import { NavBar } from "components/NavBar";
import { Input } from "components/Input";
import { Dropdown } from "components/Dropdown";
import { DropdownChild } from "components/DropdownChild";
import { Radio } from "components/Radio";
import { RadioChild } from "components/RadioChild";
import { Tab } from "components/Tab";
import { TabPane } from "components/TabPane";
import { Button } from "components/Button";
import { SHARDS } from "../../themes";
import { Container } from "components/Container";

const DeopsitContainer = ({ match, ...props }) => {
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
            <Tab>
              <TabPane name="Cypto">
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
                </DepositTypeContainer>
              </TabPane>
              <TabPane name="Fiat">
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
                      <Radio position="column" gap={8}>
                        <RadioChild name="Bank account"></RadioChild>
                        <RadioChild name="Cradit / Dabit card"></RadioChild>
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
                </DepositTypeContainer>
              </TabPane>
            </Tab>
          </DepositType>
          <DepositDetail>
            {/* <div className="title white mgb-24">Deposit network</div>
            <div className="content-column">
              <div className="content-row justify-content-center mgb-24">
                <div className="paragraph white">BTC Address</div>
              </div>
              <div className="content-row justify-content-center mgb-24">
                <div className="qr-container"></div>
              </div>
              <div className="content-row justify-content-center">
                <div className="label white">
                  1DMjCv8EV97w1m3EvjLpm6u7sTaAj1GV7s
                </div>
              </div>
            </div> */}
            <div className="title white mgb-8">Payment details</div>
            <Input title="Amount" suffix="USD"></Input>
            <div className="content-row space-between mgb-8">
              <div className="label gray">Fee:</div>
              <div className="label white">0 USD</div>
            </div>
            <div className="content-row space-between mgb-8">
              <div className="label gray">You will get:</div>
              <div className="label white">1000.00 USDT</div>
            </div>
            <CoinDropdown>
              <div className="content-row">
                <div className="label white" style={{ marginBottom: "-12px" }}>
                  Bank Type
                </div>
              </div>
              <Dropdown style={{ marginTop: "12px" }}>
                <DropdownChild name={"Kbank"}>
                  <div className="content-row align-items-end">
                    <div className="label white mgr-8">Kbank</div>
                  </div>
                </DropdownChild>
              </Dropdown>
            </CoinDropdown>
            <Input title="Bank Number" placeholder="xxx-xxxx-xxxx-x"></Input>
            <Button
              style={{ marginTop: "16px" }}
              label="Submit"
              color="green"
              fontColor="black"
            />
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
