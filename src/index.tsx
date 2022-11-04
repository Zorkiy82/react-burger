import React from "react";
import { createRoot } from 'react-dom/client';
import { AppSwitch } from "./components/app-switch/app-switch";
import { Provider } from "react-redux";
import { store } from "./services/store";

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppSwitch />
    </Provider>
  </React.StrictMode>
);
