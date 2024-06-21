import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "../src/style/font.css"

import { BrowserRouter } from "react-router-dom";

import { UserProvider } from "./providers/UserContext.jsx";
import { DiaryProvider } from "./providers/DiaryProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <DiaryProvider>
        <App />
        </DiaryProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
