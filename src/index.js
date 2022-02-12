import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Tractor } from "@aircall/tractor";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Tractor injectStyle>
        <App />
      </Tractor>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
