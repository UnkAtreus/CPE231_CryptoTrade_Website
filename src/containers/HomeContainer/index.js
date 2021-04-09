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
import { Container } from "components/Container";
import { Chart } from "components/Chart";
import { Tab } from "components/Tab";
import { TabPane } from "components/TabPane";

const HomeContainer = ({ match, ...props }) => {
  return (
    <HomeStyled>
      <Header name="header">
        <NavBar></NavBar>
      </Header>
      <OrderBook name="orderbook"></OrderBook>
      <Chartstyle name="chart" id="chart">
        <Chart></Chart>
      </Chartstyle>
      <SubHeader name="subHeader">
        <Tab>
          <TabPane name="Bitcoin" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane name="Cardano" key="2">
            Content of Tab Pane 2
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
      <OrderForm name="orderForm"></OrderForm>
      <Trades name="trades"></Trades>
      <Profile name="profile"></Profile>
      <OrderHistory name="orderHistory"></OrderHistory>
    </HomeStyled>
  );
};

export default HomeContainer;
