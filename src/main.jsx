import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./routes/route";
import { ThemeProvider } from "styled-components";
import { ThemeProviderCustom } from "./contexts/themeContexts";
import { GlobalStyle } from "./styles/style";
// import AuthProvider from "./contexts/auth";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProviderCustom>
        {(theme) => (
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Router />
        </ThemeProvider>
      )}
    </ThemeProviderCustom>
  </React.StrictMode>
)
