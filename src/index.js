import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Store from "./scripts/core/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
const Router = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

const { store, persistor } = Store();
const RootComponent = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {Router}
    </PersistGate>
  </Provider>
);
ReactDOM.render(RootComponent, document.getElementById("root"));
