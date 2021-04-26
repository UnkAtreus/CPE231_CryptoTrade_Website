import * as React from "react";
import {
  SettingStyled,
  Header,
  SubHeader,
  BalanceContainer,
  InfomationContainer,
  FiatBalanceContainer,
  SpotBalanceContainer,
  CryptoBalance,
  InfoWrapper,
} from "./styled";
import { Container, NavBar } from "components";

const SettingContainer = ({ match, ...props }) => {
  return (
    <SettingStyled>
      <Header name="header">
        <NavBar />
      </Header>
      <Container>
        <SubHeader>
          <div className="feature-card-title white">Fiat and Spot</div>
        </SubHeader>
        <BalanceContainer>
          <div className="content-row mgb-32">
            <FiatBalanceContainer>
              <div className="paragraph white mgb-8">Fiat balance</div>
              <div className="content-row space-between">
                <div className="paragraph white">USDT</div>
                <div className="paragraph white">52,160.29</div>
              </div>
              <div className="content-row space-between">
                <div className="label gray">TetherUS</div>
                <div className="label gray">≈ $52,160.29</div>
              </div>
            </FiatBalanceContainer>
            <SpotBalanceContainer>
              <div className="paragraph white mgb-8">All spot balance</div>
              <div className="content-row space-between">
                <div className="paragraph white">BTC</div>
                <div className="content-row align-items-end">
                  <div className="paragraph white">0.00390985</div>
                  <div className="label white mgl-8 mgb-2">BTC</div>
                </div>
              </div>
              <div className="content-row space-between">
                <div className="label gray">Bitcoin</div>
                <div className="label gray">≈ $230.68</div>
              </div>
            </SpotBalanceContainer>
          </div>
          <CryptoBalance>
            <div className="content-row space-between mgb-16">
              <div
                className="label gray text-left"
                style={{ minWidth: "96px" }}
              >
                Coin
              </div>
              <div
                className="label gray text-right"
                style={{ minWidth: "126px" }}
              >
                Total
              </div>
              <div
                className="label gray text-right"
                style={{ minWidth: "126px" }}
              >
                Available
              </div>
              <div
                className="label gray text-right"
                style={{ minWidth: "126px" }}
              >
                In Order
              </div>
              <div
                className="label gray text-right"
                style={{ minWidth: "126px" }}
              >
                USD Value
              </div>
            </div>

            <div className="content-row space-between align-items-center mgb-8">
              <div className="content-row" style={{ minWidth: "96px" }}>
                <div className="content-row  align-items-center mgr-8">
                  <div className="logo-symbol bitcoin"></div>
                </div>
                <div className="content-column">
                  <div className="label">BTC</div>
                  <div className="text-9">Bitcoin</div>
                </div>
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                0.00000091
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                0.00000091
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                0.00000000
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                ≈ $8.35
              </div>
            </div>

            <div className="content-row space-between align-items-center mgb-8">
              <div className="content-row" style={{ minWidth: "96px" }}>
                <div className="content-row  align-items-center mgr-8">
                  <div className="logo-symbol cardano"></div>
                </div>
                <div className="content-column">
                  <div className="label">ADA</div>
                  <div className="text-9">Cardano</div>
                </div>
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                129.33490000
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                129.33490000
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                0.00000000
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                ≈ $158.19
              </div>
            </div>

            <div className="content-row space-between align-items-center mgb-8">
              <div className="content-row" style={{ minWidth: "96px" }}>
                <div className="content-row  align-items-center mgr-8">
                  <div className="logo-symbol ethereum"></div>
                </div>
                <div className="content-column">
                  <div className="label">ETH</div>
                  <div className="text-9">Ethereum</div>
                </div>
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                0.00138437
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                0.00138437
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                0.00000000
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                ≈ $2.54
              </div>
            </div>

            <div className="content-row space-between align-items-center mgb-8">
              <div className="content-row" style={{ minWidth: "96px" }}>
                <div className="content-row  align-items-center mgr-8">
                  <div className="logo-symbol bitcoin-cash"></div>
                </div>
                <div className="content-column">
                  <div className="label">BCH</div>
                  <div className="text-9">Bitcoin Cash</div>
                </div>
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                0.00000000
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                0.00000000
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                0.00000000
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                ≈ $0.00000000
              </div>
            </div>

            <div className="content-row space-between align-items-center mgb-8">
              <div className="content-row" style={{ minWidth: "96px" }}>
                <div className="content-row  align-items-center mgr-8">
                  <div className="logo-symbol polkadot"></div>
                </div>
                <div className="content-column">
                  <div className="label">DOT</div>
                  <div className="text-9">Polkadot</div>
                </div>
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                0.00000000
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                0.00000000
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                0.00000000
              </div>
              <div
                className="label white text-right"
                style={{ minWidth: "126px" }}
              >
                ≈ $0.00000000
              </div>
            </div>
          </CryptoBalance>
        </BalanceContainer>
        <SubHeader>
          <div className="feature-card-title white">Infomation</div>
        </SubHeader>
        <InfomationContainer>
          <InfoWrapper>
            <div className="content-column">
              <div className="content-column mgb-16">
                <div className="title white mgb-16">Basic Info</div>
                <div className="content-column mgl-16">
                  <div className="content-row mgb-8">
                    <div className="label gray" style={{ minWidth: "164px" }}>
                      Name:
                    </div>
                    <div className="label white">Kittipat Dechkul</div>
                  </div>
                  <div className="content-row mgb-8">
                    <div className="label gray" style={{ minWidth: "164px" }}>
                      Telephone:
                    </div>
                    <div className="label white">+6 ••• ••• •• 90</div>
                  </div>
                  <div className="content-row mgb-8">
                    <div className="label gray" style={{ minWidth: "164px" }}>
                      Email:
                    </div>
                    <div className="label white">kittipat2544@gmail.com</div>
                  </div>
                  <div className="content-row mgb-8">
                    <div className="label gray" style={{ minWidth: "164px" }}>
                      Gender:
                    </div>
                    <div className="label white">Male</div>
                  </div>
                  <div className="content-row mgb-8">
                    <div className="label gray" style={{ minWidth: "164px" }}>
                      Birthdate:
                    </div>
                    <div className="label white">20 January 2001</div>
                  </div>
                  <div className="content-row mgb-8">
                    <div className="label gray" style={{ minWidth: "164px" }}>
                      Nationality
                    </div>
                    <div className="label white">Thai</div>
                  </div>
                </div>
              </div>
              <div className="content-column mgb-16">
                <div className="title white mgb-16">Address Info</div>
                <div className="content-column mgl-16">
                  <div className="content-row mgb-8">
                    <div className="label gray" style={{ minWidth: "164px" }}>
                      Country
                    </div>
                    <div className="label white">Thailand</div>
                  </div>
                  <div className="content-row mgb-8">
                    <div className="label gray" style={{ minWidth: "164px" }}>
                      Province:
                    </div>
                    <div className="label white">Bangkok</div>
                  </div>
                  <div className="content-row mgb-8">
                    <div className="label gray" style={{ minWidth: "164px" }}>
                      Time zone:
                    </div>
                    <div className="label white">Asia/Bangkok</div>
                  </div>
                  <div className="content-row mgb-8">
                    <div className="label gray" style={{ minWidth: "164px" }}>
                      Address
                    </div>
                    <div className="label white">1/98 The cube . . . .</div>
                  </div>
                </div>
              </div>
              <div className="content-row">
                <div className="label gray mgr-8">
                  If you want to edit/manage your infomation please contact
                </div>
                <a href="/">
                  <div className="label purple">support@admin.com</div>
                </a>
              </div>
            </div>
            <div className="content-row pic-container">
              <div className="pic-overlay cypto"></div>
            </div>
          </InfoWrapper>
        </InfomationContainer>
      </Container>
    </SettingStyled>
  );
};

export default SettingContainer;
