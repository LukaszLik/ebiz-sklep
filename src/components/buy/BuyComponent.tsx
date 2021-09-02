import React, {useEffect} from "react";
import {Box, Button, Card, CardContent, makeStyles, Typography} from "@material-ui/core";
import "../../services/UserService";
import UserService from "../../services/UserService";
import ProductService from "../../services/ProductService";
import CartService from "../../services/CartService";
import { Product } from "../cart/Cart";
import "./BuyComponent.css";
import Divider from '@material-ui/core/Divider';
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paperStyle: {
        minHeight: "20vh",
        width: "60vw",
        outlineColor: "blue",
        border: "darkslategray 4px solid",
        paddingTop: "0.5%",
        paddingBottom: "1vh",
        margin: "5vh 0vh 5vh 0vh",
    },
}));


export default function BuyComponent(){
    const [state, setState] = React.useState({
            name: "",
            surname: "",
            email: "",
            id: 0,
        }
    );
    const [loading, setLoading] = React.useState(true);
    const [products, setProducts] = React.useState([] as Product[]);

    const classes = useStyles();
    let history = useHistory();

    useEffect(() => {
        let cookie = document.cookie.split("; ").find((row) => row.startsWith("email="));

        ProductService.getCartProducts().then((productsArr) => {
            console.log(productsArr);
            setProducts(productsArr);


            products.map((product: Product) => {
                console.log("test" + product)
            });
        });

        if (cookie){
            console.log(cookie.split("=")[1]);
            UserService.getUserData(cookie.split("=")[1]).then((response) => {
                console.log(response.data);
                setState({...state, name: response.data.firstName, surname: response.data.lastName,
                    email: response.data.email, id: response.data.id});


            })
            setLoading(false);
        }
    }, [])

    const sumPrice = () => {
        let price = 0;
        for (let product of products){
            price += product.quantity * product.price;
        }

        return price;
    }

    const orderHandler = () => {
        CartService.buyProducts(state.id, sumPrice()).then(() => {
            ProductService.deleteProductsInCart().then( () => {
                console.log("bought");
                history.push("/products")
            });
        });
    }

    return loading ? <div>Ładowanie</div>
        : (
        <div className="buy-box">
            <Typography variant="h3" className="titleStyle">
                Podsumowanie zamówienia
            </Typography>

            <Card className={classes.paperStyle} variant="outlined">
                <p>Imię: {state.name}</p>
                <p>Nazwisko: {state.surname}</p>
                <p>Email: {state.email}</p>
                <Divider/>
                <p className="prodcuts" >Produkty:</p>
                {
                    products.map((product: Product) => {
                        return <p>{product.name}  x{product.quantity}</p>;
                    })
                }
                <Divider/>
                <p className="price">Cena: {sumPrice()}</p>
                <Button className="buy-button" variant="contained" onClick={orderHandler}>Kup</Button>
            </Card>
        </div>
    )
}