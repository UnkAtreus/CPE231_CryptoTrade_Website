import * as React from "react";
import { PeerToPeerStyled, Header } from "./styled";
import {
  Container,
  NavBar,
} from "components";

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
