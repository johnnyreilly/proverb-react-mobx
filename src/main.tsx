import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import { Provider } from "mobx-react";

import App from "./features/layout/App";
import sageStore from "./shared/stores/SageStore";

// __CONNECTION_URL__: JSON.stringify('http://localhost:7778/')

const stores = { sageStore };

ReactDOM.render((
  <HashRouter>
    <Provider {...stores}>
      <Route component={App} />
    </Provider>
  </HashRouter>
), document.getElementById("content"));
