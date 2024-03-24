import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
// import { Auth0Provider } from "@auth0/auth0-react";
import { Toaster } from "react-hot-toast";
import { FirebaseProvider } from "./config/firebaseinit.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <FirebaseProvider>
      <App />
      <Toaster />
    </FirebaseProvider>
  </BrowserRouter>
);
