import React from "react";
import ReactDOM from "react-dom";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import { Provider } from "react-redux";
import store, { persistor } from "./store";
import axios from 'axios';
import { setupAxios } from "./helper/axiosInterceptor";
import globalHelper from "./helper/globalHelper"
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';

setupAxios(axios, store);
globalHelper.setStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App axios={axios} />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);