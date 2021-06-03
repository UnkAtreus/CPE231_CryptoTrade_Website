import React, { useEffect } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { setRouteHistory } from "actions";
import { MainLayoutContainer } from "../../containers";
import HomeContainer from "../HomeContainer";
import { ROUTE_PATH } from "helpers";
import LoginContainer from "../LoginContainer";
import RegisterContainer from "../RegisterContainer";
import DeopsitContainer from "../DeopsitContainer";
import WithdrawContainer from "../WithdrawContainer";
import PeerToPeerContainer from "../PeerToPeerContainer";
import SettingContainer from "../SettingContainer";
import { isLoggedIn } from "../../helpers/functions/heplers";

export const GuestRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !isLoggedIn() ? <Component {...props} {...rest} /> : <Redirect to={"/"} />
    }
  />
);

export const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log(Component);
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn() ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to={"/"} />
        )
      }
    />
  );
};

const RouteContainer = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setRouteHistory(props.history));
  }, []);

  return (
    // <MainLayoutContainer>
    <>
      {/* Use props 'exact' for match single container(not share container) */}
      <Switch>
        <Route exact path={ROUTE_PATH.TRADES.LINK} component={HomeContainer} />
        <GuestRoute
          path={ROUTE_PATH.LOGIN.LINK}
          exact={true}
          component={LoginContainer}
        />
        {/* <Route exact path={ROUTE_PATH.LOGIN.LINK} component={LoginContainer} /> */}
        <Route
          exact
          path={ROUTE_PATH.REGISTER.LINK}
          component={RegisterContainer}
        />

        <PrivateRoute
          path={ROUTE_PATH.P2P.LINK}
          exact={true}
          component={PeerToPeerContainer}
        />
        {/* <Route
          exact
          path={ROUTE_PATH.P2P.LINK}
          component={PeerToPeerContainer}
        /> */}
        <Route
          exact
          path={ROUTE_PATH.DEPOSIT.LINK}
          component={DeopsitContainer}
        />
        <Route
          exact
          path={ROUTE_PATH.WITHDRAW.LINK}
          component={WithdrawContainer}
        />
        <Route
          exact
          path={ROUTE_PATH.SETTING.LINK}
          component={SettingContainer}
        />
        <Route path={ROUTE_PATH.HOME.LINK} component={HomeContainer} />
      </Switch>
    </>
    // </MainLayoutContainer>
  );
};

export default RouteContainer;
