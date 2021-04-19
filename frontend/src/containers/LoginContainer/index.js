import * as React from "react";
import { LoginStyled, Header, LoginForm, LoginFormContainer } from "./styled";
import { NavBar } from "components/NavBar";
import { InputTrade } from "components/InputTrade";
import { Input } from "components/Input";
import { ValueStep } from "components/ValueStep";
import { Chart } from "components/Chart";
import { Tab } from "components/Tab";
import { TabPane } from "components/TabPane";
import { Button } from "components/Button";
import { LOGOS } from "../../themes";
import { Container } from "components/Container";

const LoginContainer = ({ match, ...props }) => {
  return (
    <LoginStyled>
      <Header name="header">
        <NavBar></NavBar>
      </Header>
      <Container>
        <LoginForm>
          <div className="content-column">
            <div className="content-row justify-content-center mgb-16">
              <LoginFormContainer>
                <div className="content-column ">
                  <div className="content-row justify-content-center mgb-8">
                    <div className="feature-card-title white">Sign In</div>
                  </div>
                  <Input
                    type="text"
                    title="Telephone"
                    placeholder="+66 812345678"
                  />
                  <Input
                    type="password"
                    title="Password"
                    placeholder="**********"
                  />
                  <div className="content-row justify-content-center mgt-24">
                    <Button
                      label="Sign In"
                      color="purple"
                      style={{ width: "232px" }}
                    />
                  </div>
                </div>
              </LoginFormContainer>
            </div>
            <div className="content-row justify-content-center">
              <div className="label gray mgr-8">Don’t have an account? </div>
              <a href="/" className="label purple">
                Create new one
              </a>
            </div>
          </div>
        </LoginForm>
      </Container>
    </LoginStyled>
  );
};

export default LoginContainer;
