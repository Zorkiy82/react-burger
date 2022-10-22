import React from "react";
import ReactDOM from "react-dom/client";
import { AppSwitch } from "./components/app-switch/app-switch";
import { Provider } from "react-redux";
import { store } from "./services/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppSwitch />
    </Provider>
  </React.StrictMode>
);
