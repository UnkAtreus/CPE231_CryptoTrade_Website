import * as React from "react";
import {
  PeerToPeerStyled,
  Header,
  SubHeader,
  PeerToPeerType,
  PeerToPeerDetail,
  PeerToPeerTypeContainer,
  CoinDropdown,
  PeerToPeerHistory,
} from "./styled";
import {
  Container,
  Dropdown,
  DropdownChild,
  Button,
  Input,
  NavBar,
  Tab,
  TabPane,
} from "components";

const PeerToPeerContainer = ({ match, ...props }) => {
  return (
    <PeerToPeerStyled>
      <Header name="header">
        <NavBar />
      </Header>
      <Container>
        <SubHeader>
          <div className="feature-card-title white">P2P</div>
        </SubHeader>
        <div className="content-row mgb-8">
          <PeerToPeerType>
            <Tab>
              <TabPane name="Cypto">
                <PeerToPeerTypeContainer>
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
                </PeerToPeerTypeContainer>
              </TabPane>
            </Tab>
          </PeerToPeerType>
          <PeerToPeerDetail>
            <div className="title white mgb-8">P2P detail</div>
            <Input title="UserID" placeholder="UserID" />
            <Input title="Amount" suffix="BTC" />
            <div className="content-row mgb-8">
              <div className="text-9 gray mgr-8">Available amount:</div>
              <div className="text-9 white">0.00014145 BTC</div>
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
          </PeerToPeerDetail>
        </div>
        <PeerToPeerHistory>
          <div className="title white mgb-16">P2P History</div>
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
        </PeerToPeerHistory>
      </Container>
    </PeerToPeerStyled>
  );
};

export default PeerToPeerContainer;
