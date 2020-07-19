import React, { useState } from "react";
import {
  Link as RouterLink,
  withRouter,
  useLocation,
  useHistory,
} from "react-router-dom";
import PropTypes from "prop-types";
import validate from "validate.js";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Typography,
} from "@material-ui/core";

import Alert from "@material-ui/lab/Alert";
import { useData, createToken, axios } from "helpers";
import { useLoginContext } from "contexts";

const schema = {
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 64,
    },
  },
  password: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 128,
    },
  },
};

const useStyles = makeStyles((theme) => ({
  textField: {
    width: 300,
  },
  form: {
    padding: 20,
    marginTop: 90,
  },
}));

const SignIn = (props) => {
  const [state, setState] = useData({ username: "", password: "" });
  const [fieldErrors, setFieldErrors] = useData({ username: "", password: "" });
  const [errorAlert, setErrorAlert] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const { setLoginState } = useLoginContext();

  const location = useLocation();
  const history = useHistory();

  const classes = useStyles();

  const handleChange = (field, value) => {
    setFieldErrors({ [field]: null });
    setState({ [field]: value });
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    const responseToken = await createToken(state);
    switch (responseToken.status) {
      case 200:
        setLoggedIn(true);
        setLoginState({ status: 200 });
        localStorage.setItem("access_token", responseToken.data.access);
        localStorage.setItem("refresh_token", responseToken.data.refresh);
        axios.defaults.headers[
          "Authorization"
        ] = `Bearer ${responseToken.data.access}`;
        window.setTimeout(() => {
          history.push(location.state?.from.pathname || "/");
        }, 2000);
        break;
      case 400:
        setFieldErrors(responseToken.data);
        break;
      default:
        setErrorAlert(responseToken.data.detail);
        break;
    }
  };

  const hasError = (field) => (fieldErrors[field] ? true : false);

  return (
    <form className={classes.form} onSubmit={handleSignIn}>
      <Grid container direction="column" alignItems="center" spacing={3}>
        {loggedIn && (
          <Grid item>
            <Alert severity="success">
              Usted se ha autenticado correctamente !
            </Alert>
          </Grid>
        )}
        {errorAlert && (
          <Grid item>
            <Alert severity="error">{errorAlert}</Alert>
          </Grid>
        )}
        <Grid item>
          <Typography className={classes.title} variant="h2">
            Inicio de sesión
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            className={classes.textField}
            error={hasError("username")}
            fullWidth
            helperText={hasError("username") ? fieldErrors.username : null}
            label="Usuario"
            name="username"
            onChange={(evt) => handleChange("username", evt.target.value)}
            type="text"
            value={state.username}
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <TextField
            className={classes.textField}
            error={hasError("password")}
            fullWidth
            helperText={hasError("password") ? fieldErrors.password : null}
            label="Contraseña"
            name="password"
            onChange={(evt) => handleChange("password", evt.target.value)}
            type="password"
            value={state.password}
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <Button
            className={classes.signInButton}
            color="primary"
            // disabled={!formState.isValid}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Iniciar sesión
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

SignIn.propTypes = {
  history: PropTypes.object,
};

export default withRouter(SignIn);
