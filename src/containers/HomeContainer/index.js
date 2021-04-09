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
import { createChart } from "lightweight-charts";

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
      <SubHeader name="subHeader"></SubHeader>
      <OrderForm name="orderForm"></OrderForm>
      <Trades name="trades"></Trades>
      <Profile name="profile"></Profile>
      <OrderHistory name="orderHistory"></OrderHistory>
    </HomeStyled>
  );
};

export default HomeContainer;
