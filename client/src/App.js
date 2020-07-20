import React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ThemeProvider } from "@material-ui/styles";

import theme from "./theme";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./assets/scss/index.scss";
import Routes from "./Routes";

import { LoginProvider } from "contexts/login";

const browserHistory = createBrowserHistory();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router history={browserHistory}>
        <LoginProvider>
          <Routes />
        </LoginProvider>
      </Router>
    </ThemeProvider>
  );
}
