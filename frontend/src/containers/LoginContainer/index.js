import * as React from "react";
import { useState, useEffect } from "react";
import { LoginStyled, Header, LoginForm, LoginFormContainer } from "./styled";
import { Container, Button, Input, NavBar } from "components";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../store/configureStore";

import { useQuery, gql } from "@apollo/client";
import { argsToArgsConfig } from "graphql/type/definition";

const LoginContainer = ({ match, ...props }) => {
  const [userParams, setUserParams] = useState({
    email: "",
    password: "",
  });
  const [params, setParams] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const POST_LOGIN = gql`
    query ($input: LoginInput!) {
      login(login: $input) {
        token
        role
      }
    }
  `;
  const { loading, error, data } = useQuery(POST_LOGIN, {
    variables: { input: params },
  });

  const handleCreatePost = (event) => {
    event.preventDefault();
    setParams({
      ...userParams,
    });
  };

  useEffect(() => {
    console.log("data", data);
    console.log("error", error);
    if (data) {
      dispatch({
        type: "SET_TOKEN",
        data: { ...data, redirect: () => history.push("/home") } || {},
      });
      window.location.reload();
    }
  }, [data]);

  return (
    <LoginStyled>
      <Header name="header">
        <NavBar></NavBar>
      </Header>
      <Container>
        <LoginForm>
          <div className="content-column">
            <div className="content-row justify-content-center mgb-16">
              <LoginFormContainer
                onSubmit={(e) => {
                  handleCreatePost(e);
                }}
              >
                <div className="content-column ">
                  <div className="content-row justify-content-center mgb-8">
                    <div className="feature-card-title white">Sign In</div>
                  </div>
                  <Input
                    type="text"
                    title="Telephone"
                    placeholder="+66 812345678"
                    onChange={(e) =>
                      setUserParams({
                        ...userParams,
                        email: e,
                      })
                    }
                  />
                  <Input
                    type="password"
                    title="Password"
                    placeholder="**********"
                    onChange={(e) =>
                      setUserParams({
                        ...userParams,
                        password: e,
                      })
                    }
                  />
                  <div className="content-row justify-content-center mgt-24">
                    <Button
                      label="Sign In"
                      color="purple"
                      style={{ width: "232px" }}
                      onClick={() => {}}
                    />
                  </div>
                </div>
              </LoginFormContainer>
            </div>
            <div className="content-row justify-content-center">
              <div className="label gray mgr-8">Don’t have an account? </div>
              <a href="/register" className="label purple">
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
