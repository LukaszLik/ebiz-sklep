import React from "react";
import "./LoginComponentStyles.css";
import { useHistory } from "react-router-dom";
import {
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@material-ui/core";
import {
  GithubLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import LoginService from "../services/LoginService";

interface State {
  login: string;
  password: string;
  showPassword: boolean;
}

export default function LoginComponent() {
  const [state, setState] = React.useState<State>({
    login: "",
    password: "",
    showPassword: false,
  });

  const [loading, setLoading] = React.useState(false);

  const [loginError, setLoginError] = React.useState(false);
  let history = useHistory();

  const handleLoginButton = () => {
    if (!loading) {
      setLoading(true);
      setLoginError(false);
      LoginService.signIn(state.login, state.password)
        .then(() => {
          history.push("/products");
          history.go(0);
        })
        .catch(() => {
          setLoginError(true);
          setLoading(false);
        });
    }
  };

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setState({ ...state, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };

  const oauthLogin = (url: string) => {
    window.location.assign("https://sklep-back2.azurewebsites.net" + url);
  };

  return (
    <div className="page">
      <div className="container">
        <div className="text">LOGOWANIE</div>
        <div className="text-fields">
          <TextField
            className="text-field"
            value={state.login}
            onChange={handleChange("login")}
            id="outlined-basic"
            label="Login"
            variant="outlined"
          />
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Has??o</InputLabel>
            <OutlinedInput
              className="text-field"
              id="outlined-adornment-password"
              type={state.showPassword ? "text" : "password"}
              value={state.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {state.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>

        <div className="social-container">
          {loginError ? (
            <div className="error">Poda??e?? niepoprawny login lub has??o.</div>
          ) : (
            <div />
          )}
          <Button
            className="login-button"
            variant="contained"
            onClick={handleLoginButton}
            disabled={loading}
          >
            ZALOGUJ SI??
          </Button>
          <GoogleLoginButton
            style={{ width: "35vw" }}
            onClick={() => oauthLogin("/authenticate/google")}
          >
            {" "}
            <span>Zaloguj przez Gmaila</span>
          </GoogleLoginButton>
          <GithubLoginButton
            style={{ width: "35vw" }}
            onClick={() => oauthLogin("/authenticate/github")}
          >
            {" "}
            <span>Zaloguj przez GitHuba</span>
          </GithubLoginButton>
          {loading && <CircularProgress size={32} className="login-spinner" />}
        </div>
      </div>
    </div>
  );
}
