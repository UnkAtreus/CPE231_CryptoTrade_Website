import * as React from "react";
import {
  RegisterStyled,
  Header,
  RegisterForm,
  RegisterFormContainer,
  BirthdayInput,
  GenderInput,
} from "./styled";
import { NavBar } from "components/NavBar";
import { InputTrade } from "components/InputTrade";
import { Input } from "components/Input";
import { ValueStep } from "components/ValueStep";
import { Chart } from "components/Chart";
import { Tab } from "components/Tab";
import { TabPane } from "components/TabPane";
import { Button } from "components/Button";
import { LOGOS } from "../../themes";
import { Container, Dropdown, DropdownChild , Radio , RadioChild} from "components";

const RegisterContainer = ({ match, ...props }) => {

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const now = new Date().getUTCFullYear();
  const years = Array(now - (now - 60)).fill('').map((v, idx) => now - idx);
  return (
    <RegisterStyled>
      <Header name="header">
        <NavBar></NavBar>
      </Header>
      <Container>
        <RegisterForm>
          <div className="content-column">
            <div className="content-row justify-content-center mgb-16">
              <RegisterFormContainer>
                <div className="content-column ">
                  <div className="content-row justify-content-center mgb-8">
                    <div className="feature-card-title white">Sign Up</div>
                  </div>
                  <Input type="text" title="FirstName" placeholder="Kittipat" />
                  <Input type="text" title="LastName" placeholder="Dechkul" />
                  <Input type="text" title="Email" placeholder="test@gmail.com" />
                  <Input type="text" title="CitizenID" placeholder="CitizenID" />
                  <Input type="text" title="PassportNumber" placeholder="PassportNumber" />
                  <Input type="text" title="Telephone" placeholder="080 000 0000" />
                  <BirthdayInput>
                    <div className="content-row">
                      <div className="label white" style={{marginBottom: "-12px"}}>BirthDate</div>
                    </div>
                    <div className="inline-flex">
                      <Dropdown >
                        {Array.from(Array(31).keys()).map((data, index) => {
                          return (<DropdownChild name={index}>
                            {data + 1}
                          </DropdownChild>
                          );
                        })}
                      </Dropdown >
                      <Dropdown >
                        {months.map((data, index) => {
                          return (<DropdownChild name={index}>
                            {data}
                          </DropdownChild>);
                        })}
                      </Dropdown >
                      <Dropdown >
                        {years.map((data, index) => {
                          return (<DropdownChild name={index}>
                            {data}
                          </DropdownChild>);
                        })}
                      </Dropdown >
                    </div>
                  </BirthdayInput>
                  <GenderInput>
                    <div className="content-row">
                      <div className="label white">Gender</div>
                    </div>
                      <Radio position="row" gap={16}>
                        <RadioChild name="Male">
                        </RadioChild>
                        <RadioChild name="Female">
                        </RadioChild>
                        <RadioChild name="Other">
                        </RadioChild>
                      </Radio >
                  </GenderInput>
                  <Input type="text" title="Address" placeholder="Address" />
                  <div className="content-row">
                    <Input type="text" title="City" placeholder="Bangkok" style={{ marginRight: "32px" }} />
                    <Input type="text" title="PostCode" placeholder="10140" />
                  </div>
                  <Input type="password" title="Password" placeholder="**********" />
                  <Input type="password" title="ConfirmPassword" placeholder="**********" />
                  <div className="content-row justify-content-center mgt-24">
                    <Button
                      label="Sign Up"
                      color="purple"
                      style={{ width: "232px" }}
                    />
                  </div>
                </div>
              </RegisterFormContainer>
            </div>
            <div className="content-row justify-content-center">
              <div className="label gray mgr-8">Already gave an account? </div>
              <a href="/" className="label purple">
                Sign In
              </a>
            </div>
          </div>
        </RegisterForm>
      </Container>
    </RegisterStyled>
  );
};

export default RegisterContainer;
