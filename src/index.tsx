import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { FronteggProvider } from "@frontegg/react";

import "./index.css";
import App from "./App";

const contextOptions = {
  baseUrl: "https://app-42n5u7gwpces.frontegg.com",
  clientId: "372cb77d-52ef-40dc-8f6c-6c6e127a668e",
};

const authOptions = {
  // keepSessionAlive: true // Uncomment this in order to maintain the session alive
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <FronteggProvider
    contextOptions={contextOptions}
    hostedLoginBox={false}
    authOptions={authOptions}
  >
    <App />
  </FronteggProvider>
);

reportWebVitals();
