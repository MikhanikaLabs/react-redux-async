import React, { Component } from "react";
import store from "./store/";
import { Provider } from "react-redux";
import DataSearch from "./DataSearch";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <DataSearch />
        </Provider>
      </div>
    );
  }
}
