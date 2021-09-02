import React from "react";
import "./LoginComponentStyles.css"
import { useHistory } from "react-router-dom";
import {
    Button,
    FilledInput,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField
} from "@material-ui/core";
import {GithubLoginButton, GoogleLoginButton} from "react-social-login-buttons";
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
       login: '',
       password: '',
        showPassword: false,
    });

    const [loginError, setLoginError] = React.useState(false);
    let history = useHistory();

    const handleLoginButton = () => {
        // console.log(state.login + " " + state.password)
        LoginService.signIn(state.login, state.password).then( () => {
            history.push("/products");
            history.go(0);
            }
        ).catch( (error) => {
            setLoginError(true);
        });
    }

    const handleChange = (prop: keyof State) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setState({ ...state, [prop]: event.target.value });

    };

    const handleClickShowPassword = () => {
        setState({ ...state, showPassword: !state.showPassword });
    };

    const oauthLogin = (url: string) => {
        // window.location.assign("https://sklep-backend.azurewebsites.net" + url);
        window.open("http://localhost:9000" + url);
        console.log("http://localhost:9000" + url);
    };

    return (
        <div className="page">
            <div className="container">
                <div className='text'>ZALOGUJ SIĘ</div>
                <div className="text-fields">
                    <TextField className="text-field" value={state.login} onChange={handleChange("login")} id="outlined-basic" label="Login" variant="outlined" />
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Hasło</InputLabel>
                        <OutlinedInput
                        className="text-field"
                        id="outlined-adornment-password"
                        type={state.showPassword ? 'text' : 'password'}
                        value={state.password}
                        onChange={handleChange('password')}
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
                    { loginError ?
                        <div className="error">Podałeś niepoprawny login lub hasło.</div>
                        :
                        <div></div>
                    }
                    <Button className="login-button" variant="contained" onClick={handleLoginButton}>ZALOGUJ SIĘ</Button>
                    <GoogleLoginButton style={{ width: "35vw" }} onClick={() => oauthLogin("/authenticate/google")}> <span>Zaloguj przez Gmaila</span></GoogleLoginButton>
                    <GithubLoginButton style={{ width: "35vw" }} onClick={() => oauthLogin("/authenticate/github")}> <span>Zaloguj przez GitHuba</span></GithubLoginButton>

                </div>
            </div>

        </div>
    )
}