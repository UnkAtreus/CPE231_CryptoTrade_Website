import * as React from "react";
import { PeerToPeerStyled, Header } from "./styled";
import { NavBar } from "components/NavBar";
import { Input } from "components/Input";
import { Tab } from "components/Tab";
import { TabPane } from "components/TabPane";
import { Button } from "components/Button";
import { LOGOS } from "../../themes";
import { Container } from "components/Container";

const PeerToPeerContainer = ({ match, ...props }) => {
  return (
    <PeerToPeerStyled>
      <Header name="header">
        <NavBar/>
      </Header>
      <Container>
      </Container>
    </PeerToPeerStyled>
  );
};

export default PeerToPeerContainer;
