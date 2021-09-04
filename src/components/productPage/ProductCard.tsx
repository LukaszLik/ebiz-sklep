import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import "../Product.css"
import {Snackbar} from "@material-ui/core";
import LoginService from "../../services/LoginService";
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ProductCard(props: any){
    const [snackbar, setSnackbar] = React.useState(false);

    const handleAddToCart = () => {
        // items= id, name, quantity, price; id, name, quantity, price
        if(LoginService.isLogged()) {
            let allCookies = document.cookie.split(";");
            for (let cookie of allCookies) {
                let id = cookie.split("=")[0]
                let vals = cookie.split("=")[1].split(",");

                let numberOfProducts = parseInt(vals[1]) + 1;

                if (id == props.id) {
                    document.cookie = `${props.id}=${props.name}, ${numberOfProducts}, ${props.price}; path=/`
                } else {
                    document.cookie = `${props.id}=${props.name}, 1, ${props.price}; path=/`
                }
            }
        }
        else{
            console.log("Niezlogowany użytkownik");
            setSnackbar(true);
            // snack.enqueueSnackbar("REEE");
        }

    }

    const handleClose = () => {
        setSnackbar(false);
    }

    return(
        <Card className="card" variant="outlined">
            <CardContent>
                <Typography variant="h5" component="h2" className="title">
                    {props.name}
                </Typography>
                <Typography className="pos" color="textSecondary">
                    {props.price} zł
                </Typography>
                <Typography variant="body2" component="p" className="description">
                    {props.description}
                </Typography>
            </CardContent>
            <CardActions>
                <div>
                <Button className="add-to-cart-button" onClick={handleAddToCart} variant="contained" size="small">Dodaj do koszyka</Button>
                </div>
            </CardActions>
            {snackbar ?
                <Snackbar open={snackbar} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="info">
                        Zaloguj się aby dodać produkt do koszyka!
                    </Alert>
                </Snackbar>
                : <div style={{ display: "none"}} />
            }

        </Card>
    )
}