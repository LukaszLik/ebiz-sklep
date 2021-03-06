import React from "react";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import "./RegisterComponent.css";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";
import { Button, CircularProgress, FormHelperText } from "@material-ui/core";
import LoginService from "../../services/LoginService";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  })
);

interface State {
  password: string;
  showPassword: boolean;
  name: string;
  surname: string;
  email: string;
}

export default function RegisterComponent() {
  const [values, setValues] = React.useState<State>({
    password: "",
    showPassword: false,
    name: "",
    surname: "",
    email: "",
  });

  let history = useHistory();

  const [registerError, setRegisterError] = React.useState(false);

  const [nameError, setNameError] = React.useState("");
  const [surnameError, setSurnameError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  const validateEmail = (value: any) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setEmailError("");
    if (value.length === 0) {
      setEmailError("Email jest wymagany.");
    } else if (!re.test(String(value).toLowerCase())) {
      setEmailError("Niepoprawny adres email.");
    } else if (value.length > 64) {
      setEmailError("Email nie powinien mie?? wi??cej ni?? 64 znaki.");
    }
  };

  const validatePassword = (value: any) => {
    setPasswordError("");
    if (value.length === 0) {
      setPasswordError("Has??o jest wymagane.");
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
      setPasswordError("Wymagane: 8 znak??w, 1 liter?? oraz 1 cyfr??.");
    }
  };

  const validateName = (value: any) => {
    setNameError("");
    if (value.length === 0) {
      setNameError("Imi?? u??ytkownika jest wymagane.");
    } else if (value.length > 64) {
      setNameError("Imi?? u??ytkownika nie powinno mie?? ni?? 64 znaki.");
    }
  };

  const validateSurname = (value: any) => {
    setSurnameError("");
    if (value.length === 0) {
      console.log("null");
      setSurnameError("Nazwisko u??ytkownika jest wymagane.");
    } else if (value.length > 64) {
      setSurnameError(
        "Nazwisko u??ytkownika nie powinno mie?? wi??cej ni?? 64 znaki."
      );
    }
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, name: event.target.value });
    validateName(event.target.value);
  };

  const handleSurname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, surname: event.target.value });
    validateSurname(event.target.value);
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, email: event.target.value });
    validateEmail(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, password: event.target.value });
    validatePassword(event.target.value);
  };

  const handleRegisterButton = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      console.log("SEND ITTT");
      setLoading(true);
      LoginService.signUp(
        values.email,
        values.name,
        values.surname,
        values.password
      )
        .then(() => {
          history.push("/login");
        })
        .catch(() => {
          setLoading(false);
          setRegisterError(true);
        });
    } else {
      console.log("B????dy w formularzu");
    }
  };

  const validate = () => {
    validateSurname(values.surname);
    validateEmail(values.email);
    validateName(values.name);
    validatePassword(values.password);

    return (
      nameError === "" &&
      surnameError === "" &&
      emailError === "" &&
      passwordError === ""
    );
  };

  return (
    <div className="register-container">
      <div className="text">REJESTRACJA</div>

      <form className="register-form" onSubmit={handleRegisterButton}>
        <TextField
          onChange={handleName}
          className="input-field"
          label="Imi??"
          error={Boolean(nameError)}
          helperText={nameError}
          value={values.name}
        />
        <TextField
          onChange={handleSurname}
          className="input-field"
          label="Nazwisko"
          error={Boolean(surnameError)}
          helperText={surnameError}
          value={values.surname}
        />
        <TextField
          onChange={handleEmail}
          className="input-field"
          label="Email"
          error={Boolean(emailError)}
          helperText={emailError}
          value={values.email}
        />
        <FormControl className="input-field">
          <InputLabel required htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handlePassword}
            error={Boolean(passwordError)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText
            style={{ color: passwordError !== "" ? "red" : "gray" }}
            id="component-error-text"
          >
            {passwordError}
          </FormHelperText>
        </FormControl>
        {registerError ? (
          <p className="error">Podany adres email jest ju?? w u??yciu</p>
        ) : (
          <div />
        )}
        <Button
          disabled={loading}
          className="register-button"
          type="submit"
          onClick={validate}
          variant="contained"
        >
          Zarejestruj
        </Button>
        {loading && <CircularProgress size={32} className="register-spinner" />}
      </form>
    </div>
  );
}
