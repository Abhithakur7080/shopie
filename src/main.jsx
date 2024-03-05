import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import {Toaster} from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Auth0Provider
      domain="dev-e0ux0b7xyu2mcey4.us.auth0.com"
      clientId="0SkUCmlye3AFLqtnWqpWzLEtfoR3cxLB"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
      <Toaster/>
    </Auth0Provider>
  </BrowserRouter>
);
