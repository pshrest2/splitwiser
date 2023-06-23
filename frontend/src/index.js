import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider as ReduxProvider } from "react-redux";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import allReducers from "./reducers";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = configureStore({
  reducer: allReducers,
});

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/account`,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      }}
    >
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
