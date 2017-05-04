import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { Provider } from "mobx-react";

import App from "./features/layout/App";
import AppState from "./appState";

// __CONNECTION_URL__: JSON.stringify('http://localhost:7778/')

const appState = new AppState();

ReactDOM.render((
  <HashRouter>
    <Provider appState={appState}>
      <App />
    </Provider>
  </HashRouter>
), document.getElementById("content"));
