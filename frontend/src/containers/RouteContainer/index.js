import React from 'react'
import {
  Route, Switch
} from 'react-router-dom'
import {
  connect,
} from 'react-redux'
import {
  setRouteHistory,
} from 'actions'
import {
  MainLayoutContainer,
} from '../../containers'
import HomeContainer from "../HomeContainer"
import {
  ROUTE_PATH,
} from 'helpers'

export class RouteApp extends React.Component {

  constructor(props) {
    super(props)
    props.setRouteHistory(props.history)
    this.state = {}
  }

  render() {
    return (
      <MainLayoutContainer>
        {/* Use props 'exact' for match single container(not share container) */}
        <Switch>
          <Route exact path={ROUTE_PATH.TRADES.LINK} component={HomeContainer} />
          <Route exact path={ROUTE_PATH.LOGIN.LINK} component={HomeContainer} />
          <Route exact path={ROUTE_PATH.REGISTER.LINK} component={HomeContainer} />
          <Route exact path={ROUTE_PATH.P2P.LINK} component={HomeContainer} />
          <Route exact path={ROUTE_PATH.DEPOSIT.LINK} component={HomeContainer} />
          <Route exact path={ROUTE_PATH.WITHDRAW.LINK} component={HomeContainer} />
          <Route exact path={ROUTE_PATH.SETTING.LINK} component={HomeContainer} />
          <Route path={ROUTE_PATH.HOME.LINK} component={HomeContainer} />
        </Switch>
      </MainLayoutContainer>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setRouteHistory: (data) => dispatch(setRouteHistory(data))
  }
}

export const RouteContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RouteApp)