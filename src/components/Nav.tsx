import React, { useEffect } from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import "./Nav.css";
import LoginService from "../services/LoginService";
import IconButton from "@material-ui/core/IconButton";

export const Nav: React.FC = () => {
  const [logged, setLogged] = React.useState(false);
  const [email, setEmail] = React.useState("");

  let history = useHistory();

  useEffect(() => {
    const val = LoginService.isLogged();

    if (val !== "") {
      setLogged(true);
      setEmail(val);
    } else {
      setLogged(false);
    }
  }, [logged]);

  const handleLogOut = () => {
    let allCookies = document.cookie.split(";");
    for (let cookie of allCookies)
      document.cookie = cookie + "=;expires=" + new Date(0).toUTCString();
    history.push("/products");
    history.go(0);
  };

  return (
    <Box className="nav-box">
      <Link className="nav-link" to={"/products"}>
        <img
          className="logo"
          src="https://cdn.frankerfacez.com/emoticon/236895/4"
          alt="hypers"
        />
        <Typography variant={"h5"}>Żabbka</Typography>
      </Link>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {logged ? (
          <p>{email}</p>
        ) : (
          <Button
            component={Link}
            to="/login"
            className="button"
            variant="contained"
          >
            Zaloguj się
          </Button>
        )}
        {logged ? (
          <IconButton component={Link} to="/cart" className="icon-button">
            <ShoppingCartOutlinedIcon className="icon" />
          </IconButton>
        ) : (
          <div />
        )}
        {logged ? (
          <Button onClick={handleLogOut} className="button" variant="contained">
            Wyloguj się
          </Button>
        ) : (
          <Button
            component={Link}
            to="/register"
            className="button"
            variant="contained"
          >
            Zarejestruj się
          </Button>
        )}
      </div>
    </Box>
  );
};
