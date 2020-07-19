import React, { useState } from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ThemeProvider } from "@material-ui/styles";

import theme from "./theme";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./assets/scss/index.scss";
import Routes from "./Routes";

import { axios } from "helpers";
import { LoginProvider } from "contexts/login";

const browserHistory = createBrowserHistory();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <LoginProvider>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </LoginProvider>
    </ThemeProvider>
  );
}

function Login(props) {
  const [user, setUser] = useState("");
  const [passowrd, setPassword] = useState("");

  async function handleSubmit(event) {
    // event.preventDefault();
    try {
      const response = await axios.post("/token/", {
        username: user,
        password: passowrd,
      });
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      console.log(response);
    } catch (error) {
      throw error;
    }
  }

  return (
    <div style={{ display: "block" }}>
      Comercio
      <input
        type="text"
        value={user}
        placeholder="Usuario"
        onChange={(evt) => setUser(evt.target.value)}
      />
      <input
        type="passowrd"
        value={passowrd}
        placeholder="Contraseña"
        onChange={(evt) => setPassword(evt.target.value)}
      />
      <button onClick={() => handleSubmit()}>Test</button>
    </div>
  );
}

// export default App;
