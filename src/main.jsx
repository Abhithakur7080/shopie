import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { FirebaseProvider } from "./config/firebaseinit.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <FirebaseProvider>
      <Provider store={store}>
        <App />
        <Toaster />
      </Provider>
    </FirebaseProvider>
  </BrowserRouter>
);
