import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "../app/app";

export function AppSwitch() {
  return (
    <Router>
      <App />
    </Router>
  );
}
