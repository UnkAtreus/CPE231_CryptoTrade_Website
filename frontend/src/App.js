import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Router, Route, Redirect, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { getCreateStore } from "store";
import RouteContainer from "containers/RouteContainer";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { isLoggedIn } from "./helpers/functions/heplers";
import HomeContainer from "./containers/HomeContainer";
import LoginContainer from "./containers/LoginContainer";
import RegisterContainer from "./containers/RegisterContainer";
import DeopsitContainer from "./containers/DeopsitContainer";
import WithdrawContainer from "./containers/WithdrawContainer";
import PeerToPeerContainer from "./containers/PeerToPeerContainer";
import SettingContainer from "./containers/SettingContainer";
import LandingContainer from "./containers/LandingContainer";
import OwnerContainer from "./containers/OwnerContainer";
import { ROUTE_PATH } from "helpers";
import { history } from "./store/configureStore";
import StaffContainer from "./containers/StaffContainer";
import StaffSubContainer from "./containers/StaffSubContainer";
import { WebSocketLink } from "@apollo/client/link/ws";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import AdminSubContainer from "./containers/AdminSubContainer";
import AdminContainer from "./containers/AdminContainer";

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
});

// const wsLink = new WebSocketLink({
//   uri: "ws://localhost:5000/subscriptions",
//   options: {
//     reconnect: true,
//   },
// });

// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === "OperationDefinition" &&
//       definition.operation === "subscription"
//     );
//   },
//   wsLink,
//   httpLink
// );

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("access-token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  onError: (e) => {
    console.log(e);
  },
});

const store = getCreateStore();

export const GuestRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !isLoggedIn() ? <Component {...props} {...rest} /> : <Redirect to={"/"} />
    }
  />
);

export const PrivateRoute = ({ component: Component, ...rest }) => {
  // console.log(Component);
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn() ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};

export const App = (props) => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        {/* <ConnectedRouter history={history}> */}
        <Router history={history}>
          <Switch>
            <PrivateRoute
              exact={true}
              path={ROUTE_PATH.TRADES.LINK}
              component={HomeContainer}
            />
            <GuestRoute
              exact={true}
              path={ROUTE_PATH.LOGIN.LINK}
              component={LoginContainer}
            />
            <GuestRoute
              exact={true}
              path={ROUTE_PATH.REGISTER.LINK}
              component={RegisterContainer}
            />
            <PrivateRoute
              path={ROUTE_PATH.P2P.LINK}
              exact={true}
              component={PeerToPeerContainer}
            />
            <PrivateRoute
              exact={true}
              path={ROUTE_PATH.DEPOSIT.LINK}
              component={DeopsitContainer}
            />
            <PrivateRoute
              exact={true}
              path={ROUTE_PATH.WITHDRAW.LINK}
              component={WithdrawContainer}
            />
            <PrivateRoute
              exact={true}
              path={ROUTE_PATH.SETTING.LINK}
              component={SettingContainer}
            />
            <PrivateRoute
              exact={true}
              path={ROUTE_PATH.STAFF_SUB.LINK}
              component={StaffSubContainer}
            />
            <PrivateRoute
              exact={true}
              path={ROUTE_PATH.STAFF.LINK}
              component={StaffContainer}
            />
            <PrivateRoute
              exact={true}
              path={ROUTE_PATH.ADMIN_SUB.LINK}
              component={AdminSubContainer}
            />
            <PrivateRoute
              exact={true}
              path={ROUTE_PATH.ADMIN.LINK}
              component={AdminContainer}
            />
            <PrivateRoute
              exact={true}
              path={ROUTE_PATH.OWNER.LINK}
              component={OwnerContainer}
            />
            <PrivateRoute
              exact={true}
              path={ROUTE_PATH.ADMIN.LINK}
              component={StaffContainer}
            />
            <Route path={ROUTE_PATH.HOME.LINK} component={LandingContainer} />
          </Switch>
        </Router>
        {/* </ConnectedRouter> */}
      </Provider>
    </ApolloProvider>
  );
};

export default App;
