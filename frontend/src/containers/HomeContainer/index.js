import * as React from "react";
import {
  HomeStyled,
  Header,
  SubHeader,
  Profile,
  OrderBook,
  OrderForm,
  Chartstyle,
  Trades,
  OrderHistory,
} from "./styled";
import { NavBar } from "components/NavBar";
import { InputTrade } from "components/InputTrade";
import { ValueStep } from "components/ValueStep";
import { Chart } from "components/Chart";
import { Tab } from "components/Tab";
import { TabPane } from "components/TabPane";
import { Button } from "components/Button";
import { LOGOS } from "../../themes";

const HomeContainer = ({ match, ...props }) => {
  console.log("LOGO", LOGOS["bitcoin.png"]);

  // const setValue = (value) => {
  //   console.log("test", value);
  // };

  return (
    <HomeStyled>
      <Header name="header">
        <NavBar></NavBar>
      </Header>
      <OrderBook name="orderbook">
        <div className="orderbook-container">
          <div className="content-column mgb-16">
            <div className="paragraph mgb-8">Orderbook</div>
            <div className="content-row space-between mgb-2">
              <div
                className="label gray align-items-start"
                style={{ minWidth: "70px" }}
              >
                Price(USDT)
              </div>
              <div
                className="label gray align-items-end "
                style={{ minWidth: "75px" }}
              >
                Amount(BTC)
              </div>
              <div
                className="label gray align-items-end text-right"
                style={{ minWidth: "60px" }}
              >
                Total
              </div>
            </div>

            <div className="content-column mgb-16">
              {Array.from(Array(17).keys()).map((data, index) => {
                return (
                  <div className="content-row space-between mgb-2" key={index}>
                    <div
                      className="label red align-items-start"
                      style={{ minWidth: "70px" }}
                    >
                      52187.43
                    </div>
                    <div
                      className="label white align-items-end text-right"
                      style={{ minWidth: "75px" }}
                    >
                      0.012375
                    </div>
                    <div
                      className="label white align-items-end text-right"
                      style={{ minWidth: "60px" }}
                    >
                      645.81945
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="content-row align-items-center mgb-16">
              <div className="paragraph green mgr-16">52,160.29</div>
              <div className="label gray">$52,160.29</div>
            </div>

            <div className="content-column mgb-16">
              {Array.from(Array(17).keys()).map((data, index) => {
                return (
                  <div className="content-row space-between mgb-2" key={index}>
                    <div
                      className="label green align-items-start"
                      style={{ minWidth: "70px" }}
                    >
                      52187.43
                    </div>
                    <div
                      className="label white align-items-end text-right"
                      style={{ minWidth: "75px" }}
                    >
                      0.012375
                    </div>
                    <div
                      className="label white align-items-end text-right"
                      style={{ minWidth: "60px" }}
                    >
                      645.81945
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </OrderBook>
      <Chartstyle name="chart" id="chart">
        <Chart />
      </Chartstyle>
      <SubHeader name="subHeader">
        <Tab>
          <TabPane name="Bitcoin" key="1">
            <div className="subHeader-container">
              <div className="content-row" style={{ alignItems: "flex-end" }}>
                <div className="content-column mgr-32">
                  <div className="paragraph white">BTC/USDT</div>
                  <div className="label gray">Bitcoin</div>
                </div>
                <div className="content-column mgr-32">
                  <div className="paragraph green">52,160.29</div>
                  <div className="label gray">$52,160.29</div>
                </div>
                <div className="content-column mgr-16">
                  <div className="label gray">24h Change</div>
                  <div className="content-row">
                    <div className="label red mgr-4">-3,261.80</div>
                    <div className="label red">-6.00%</div>
                  </div>
                </div>
                <div className="content-column mgr-16">
                  <div className="label gray">24h High</div>
                  <div className="label white">55,542.69</div>
                </div>
                <div className="content-column mgr-16">
                  <div className="label gray">24h Low</div>
                  <div className="label white">50,427.56</div>
                </div>
                <div className="content-column mgr-16">
                  <div className="label gray">24h Volume(BTC)</div>
                  <div className="label white">103,777.03</div>
                </div>
                <div className="content-column mgr-16">
                  <div className="label gray">24h Volume(USDT)</div>
                  <div className="label white">5,423,653,561.61</div>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane name="Cardano" key="2">
            <div className="subHeader-container">
              <div className="content-row" style={{ alignItems: "flex-end" }}>
                <div className="content-column mgr-32">
                  <div className="paragraph white">ADA/USDT</div>
                  <div className="label gray">Cardano</div>
                </div>
                <div className="content-column mgr-32">
                  <div className="paragraph green">52,160.29</div>
                  <div className="label gray">$52,160.29</div>
                </div>
                <div className="content-column mgr-16">
                  <div className="label gray">24h Change</div>
                  <div className="content-row">
                    <div className="label red mgr-4">-3,261.80</div>
                    <div className="label red">-6.00%</div>
                  </div>
                </div>
                <div className="content-column mgr-16">
                  <div className="label gray">24h High</div>
                  <div className="label white">55,542.69</div>
                </div>
                <div className="content-column mgr-16">
                  <div className="label gray">24h Low</div>
                  <div className="label white">50,427.56</div>
                </div>
                <div className="content-column mgr-16">
                  <div className="label gray">24h Volume(BTC)</div>
                  <div className="label white">103,777.03</div>
                </div>
                <div className="content-column mgr-16">
                  <div className="label gray">24h Volume(USDT)</div>
                  <div className="label white">5,423,653,561.61</div>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane name="Ethereum" key="3">
            Content of Tab Pane 3
          </TabPane>
          <TabPane name="Bitcoin Cash" key="4">
            Content of Tab Pane 4
          </TabPane>
          <TabPane name="Polkadot" key="5">
            Content of Tab Pane 5
          </TabPane>
        </Tab>
      </SubHeader>
      <OrderForm name="orderForm">
        <Tab>
          <TabPane name="Limit" key="1">
            <div className="limit-container">
              <div className="content-row space-between">
                <div
                  className="content-column mgr-16"
                  style={{ marginRight: "7%", flex: "1 1 0%" }}
                >
                  <div className="content-row space-between mgb-2">
                    <div className="title white">Buy BTC</div>
                    <div className="content-row">
                      <div className="label gray">0.15143617</div>
                      <div className="label gray mgl-8">USDT</div>
                    </div>
                  </div>
                  <InputTrade prefix="Price" suffix="USDT" />
                  <InputTrade prefix="Amount" suffix="BTC" />
                  <ValueStep />
                  <InputTrade prefix="Total" suffix="USDT" />
                  <Button label="Buy BTC" color="green" />
                </div>

                <div className="content-column" style={{ flex: "1 1 0%" }}>
                  <div className="content-row space-between mgb-2">
                    <div className="title white">Sell BTC</div>
                    <div className="content-row">
                      <div className="label gray">0.00000091</div>
                      <div className="label gray mgl-8">BTC</div>
                    </div>
                  </div>
                  <InputTrade prefix="Price" suffix="USDT" />
                  <InputTrade prefix="Amount" suffix="BTC" />
                  <ValueStep />
                  <InputTrade prefix="Total" suffix="USDT" />
                  <Button label="Sell BTC" color="red" />
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane name="Market" key="2">
            <div className="market-container">
              <div className="content-row space-between">
                <div
                  className="content-column mgr-16"
                  style={{ marginRight: "7%", flex: "1 1 0%" }}
                >
                  <div className="content-row space-between mgb-2">
                    <div className="title white">Buy BTC</div>
                    <div className="content-row">
                      <div className="label gray">0.15143617</div>
                      <div className="label gray mgl-8">USDT</div>
                    </div>
                  </div>
                  <InputTrade prefix="Market" suffix="USDT" />
                  <InputTrade prefix="Amount" suffix="BTC" />
                  <ValueStep />
                  <InputTrade prefix="Total" suffix="USDT" />
                  <Button label="Buy BTC" color="green" />
                </div>

                <div className="content-column" style={{ flex: "1 1 0%" }}>
                  <div className="content-row space-between mgb-2">
                    <div className="title white">Sell BTC</div>
                    <div className="content-row">
                      <div className="label gray">0.00000091</div>
                      <div className="label gray mgl-8">BTC</div>
                    </div>
                  </div>
                  <InputTrade prefix="Market" suffix="USDT" />
                  <InputTrade prefix="Amount" suffix="BTC" />
                  <ValueStep />
                  <InputTrade prefix="Total" suffix="USDT" />
                  <Button label="Sell BTC" color="red" />
                </div>
              </div>
            </div>
          </TabPane>
        </Tab>
      </OrderForm>
      <Trades name="trades">
        <div className="trades-container">
          <div className="content-column mgb-16">
            <div className="paragraph mgb-8">Market Trades</div>
            <div
              className="content-row space-between mgb-2"
              style={{ paddingRight: "22px" }}
            >
              <div
                className="label gray align-items-start"
                style={{ minWidth: "70px" }}
              >
                Price(USDT)
              </div>
              <div
                className="label gray align-items-end "
                style={{ minWidth: "75px" }}
              >
                Amount(BTC)
              </div>
              <div
                className="label gray align-items-end text-right"
                style={{ minWidth: "60px" }}
              >
                Time
              </div>
            </div>
            <div className="trades-price-container">
              {Array.from(Array(30).keys()).map((data, index) => {
                return (
                  <div
                    className="content-row space-between mgb-2"
                    style={{ paddingRight: "16px" }}
                    key={index}
                  >
                    <div
                      className="label red align-items-start"
                      style={{ minWidth: "70px" }}
                    >
                      52187.43
                    </div>
                    <div
                      className="label white align-items-end text-right"
                      style={{ minWidth: "75px" }}
                    >
                      0.012375
                    </div>
                    <div
                      className="label white align-items-end text-right"
                      style={{ minWidth: "60px" }}
                    >
                      03:25:10
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Trades>
      <Profile name="profile">
        <div className="profile-container">
          <div className="content-column mgb-16">
            <div className="paragraph mgb-8">Fiat balance</div>
            <div className="content-row space-between">
              <div className="content-column">
                <div className="paragraph">USDT</div>
                <div className="label gray">TetherUS</div>
              </div>
              <div className="content-column text-right">
                <div className="paragraph">52,160.29</div>
                <div className="label gray">$ 52,160.29</div>
              </div>
            </div>
          </div>
          <div className="content-column">
            <div className="paragraph mgb-8">Spot balance</div>
            <div className="content-row space-between mgb-8">
              <div className="label gray">Coin</div>
              <div className="label gray text-right">Total</div>
            </div>
            <div className="content-row space-between align-items-center  mgb-8">
              <div className="content-row">
                <div className="content-row  align-items-center mgr-8">
                  <div className="logo-symbol bitcoin"></div>
                </div>
                <div className="content-column">
                  <div className="label">BTC</div>
                  <div className="text-9">Bitcoin</div>
                </div>
              </div>
              <div className="label">0.00000091</div>
            </div>

            <div className="content-row space-between align-items-center  mgb-8">
              <div className="content-row">
                <div className="content-row  align-items-center mgr-8">
                  <div className="logo-symbol cardano"></div>
                </div>
                <div className="content-column">
                  <div className="label">ADA</div>
                  <div className="text-9">Cardano</div>
                </div>
              </div>
              <div className="label">129.33490000</div>
            </div>

            <div className="content-row space-between align-items-center  mgb-8">
              <div className="content-row">
                <div className="content-row  align-items-center mgr-8">
                  <div className="logo-symbol ethereum"></div>
                </div>
                <div className="content-column">
                  <div className="label">ETH</div>
                  <div className="text-9">Ethereum</div>
                </div>
              </div>
              <div className="label">0.00138437</div>
            </div>

            <div className="content-row space-between align-items-center  mgb-8">
              <div className="content-row">
                <div className="content-row  align-items-center mgr-8">
                  <div className="logo-symbol bitcoin-cash"></div>
                </div>
                <div className="content-column">
                  <div className="label">BCH</div>
                  <div className="text-9">Bitcoin Cash</div>
                </div>
              </div>
              <div className="label">0.000</div>
            </div>

            <div className="content-row space-between align-items-center  mgb-8">
              <div className="content-row">
                <div className="content-row  align-items-center mgr-8">
                  <div className="logo-symbol polkadot"></div>
                </div>
                <div className="content-column">
                  <div className="label">DOT</div>
                  <div className="text-9">Polkadot</div>
                </div>
              </div>
              <div className="label">0.000</div>
            </div>
          </div>
        </div>
      </Profile>
      <OrderHistory name="orderHistory">
        <Tab>
          <TabPane name="Open Order" key="1">
            <div className="open-order-container">
              <div className="content-row space-between mgb-8">
                <div
                  className="label gray text-center"
                  style={{ minWidth: "126px" }}
                >
                  Date
                </div>
                <div
                  className="label gray text-center"
                  style={{ minWidth: "64px" }}
                >
                  Pair
                </div>
                <div
                  className="label gray text-center"
                  style={{ minWidth: "28px" }}
                >
                  Type
                </div>
                <div
                  className="label gray text-center"
                  style={{ minWidth: "24px" }}
                >
                  Side
                </div>
                <div
                  className="label gray text-center"
                  style={{ minWidth: "96px" }}
                >
                  Price
                </div>
                <div
                  className="label gray text-center"
                  style={{ minWidth: "96px" }}
                >
                  Amount
                </div>
                <div
                  className="label gray text-center"
                  style={{ minWidth: "52px" }}
                >
                  Filled
                </div>
                <div
                  className="label gray text-center"
                  style={{ minWidth: "126px" }}
                >
                  Total
                </div>
                <div
                  className="label gray text-center"
                  style={{ minWidth: "126px" }}
                >
                  Action
                </div>
              </div>

              <div className="content-row space-between order-container align-items-center">
                <div
                  className="label gray text-center"
                  style={{ minWidth: "126px" }}
                >
                  03-09 11:29:32
                </div>
                <div
                  className="label white text-center"
                  style={{ minWidth: "64px" }}
                >
                  BTC/USDT
                </div>
                <div
                  className="label white text-center"
                  style={{ minWidth: "28px" }}
                >
                  Limit
                </div>
                <div
                  className="label red text-center"
                  style={{ minWidth: "24px" }}
                >
                  Sell
                </div>
                <div
                  className="label white text-center"
                  style={{ minWidth: "96px" }}
                >
                  52276.99
                </div>
                <div
                  className="label white text-center"
                  style={{ minWidth: "96px" }}
                >
                  0.000001
                </div>
                <div
                  className="label white text-center"
                  style={{ minWidth: "52px" }}
                >
                  100.00%
                </div>
                <div
                  className="label white text-center"
                  style={{ minWidth: "126px" }}
                >
                  258.00000699 USDT
                </div>
                <div
                  className="label red text-center pointer"
                  style={{ minWidth: "126px" }}
                >
                  Cancel
                </div>
              </div>

              <div className="content-row space-between order-container even align-items-center">
                <div
                  className="label gray text-center"
                  style={{ minWidth: "126px" }}
                >
                  03-09 11:29:32
                </div>
                <div
                  className="label white text-center"
                  style={{ minWidth: "64px" }}
                >
                  BTC/USDT
                </div>
                <div
                  className="label white text-center"
                  style={{ minWidth: "28px" }}
                >
                  Limit
                </div>
                <div
                  className="label red text-center"
                  style={{ minWidth: "24px" }}
                >
                  Sell
                </div>
                <div
                  className="label white text-center"
                  style={{ minWidth: "96px" }}
                >
                  52276.99
                </div>
                <div
                  className="label white text-center"
                  style={{ minWidth: "96px" }}
                >
                  0.000001
                </div>
                <div
                  className="label white text-center"
                  style={{ minWidth: "52px" }}
                >
                  100.00%
                </div>
                <div
                  className="label white text-center"
                  style={{ minWidth: "126px" }}
                >
                  258.00000699 USDT
                </div>
                <div
                  className="label red text-center pointer"
                  style={{ minWidth: "126px" }}
                >
                  Cancel
                </div>
              </div>

              <div className="content-row space-between order-container  align-items-center">
                <div
                  className="label gray text-center"
                  style={{ minWidth: "126px" }}
                >
                  03-09 11:29:32
                </div>
                <div
                  className="label white text-center"
                  style={{ minWidth: "64px" }}
                >
                  BTC/USDT
                </div>
                <div
                  className="label white text-center"
                  style={{ minWidth: "28px" }}
                >
                  Limit
                </div>
                <div
                  className="label red text-center"
                  style={{ minWidth: "24px" }}
                >
                  Sell
                </div>
                <div
                  className="label white text-center"
                  style={{ minWidth: "96px" }}
                >
                  52276.99
                </div>
                <div
                  className="label white text-center"
                  style={{ minWidth: "96px" }}
                >
                  0.000001
                </div>
                <div
                  className="label white text-center"
                  style={{ minWidth: "52px" }}
                >
                  100.00%
                </div>
                <div
                  className="label white text-center"
                  style={{ minWidth: "126px" }}
                >
                  258.00000699 USDT
                </div>
                <div
                  className="label red text-center pointer"
                  style={{ minWidth: "126px" }}
                >
                  Cancel
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane name="Order History" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane name="Trade History" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tab>
      </OrderHistory>
    </HomeStyled>
  );
};

export default HomeContainer;