import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { getCreateStore } from "store";
import RouteContainer from "containers/RouteContainer";

const store = getCreateStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route path="/" component={RouteContainer} />
        </Router>
      </Provider>
    );
  }
}
