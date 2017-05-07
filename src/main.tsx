import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import { Provider } from "mobx-react";

import App from "./features/layout/App";
import sagesStore from "./shared/stores/SagesStore";
import selectedSageStore from "./shared/stores/SelectedSageStore";

// __CONNECTION_URL__: JSON.stringify('http://localhost:7778/')

const stores = { sagesStore, selectedSageStore };

ReactDOM.render((
  <HashRouter>
    <Provider {...stores}>
      <Route component={App} />
    </Provider>
  </HashRouter>
), document.getElementById("content"));
