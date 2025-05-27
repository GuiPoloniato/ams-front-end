import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./routes/route";
import { GlobalStyle } from "./styles/style";
// import AuthProvider from "./contexts/auth";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <AuthProvider> */}
      <Router />
      <GlobalStyle />
    {/* </AuthProvider> */}
  </React.StrictMode>
)
