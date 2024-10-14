import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Auth0Provider
      domain="dev-0dbbqpfcmuns8y7b.us.auth0.com"
      clientId="AtK6iLBEHdNRCQnLpYvRbcxJynvjIQ3V"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
      audience="scb-productservice-api"
      scope="openid profile email read:product write:product"
    >
      <App />
    </Auth0Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
