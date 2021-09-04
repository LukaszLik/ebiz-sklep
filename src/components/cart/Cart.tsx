import React, {useEffect} from "react";
import RecordInCart from "../RecordInCart";
import {Box, Button, Card, makeStyles, Typography} from "@material-ui/core";
import ProductService from "../../services/ProductService";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from '@material-ui/core/TableCell';
import {Link, useHistory} from "react-router-dom";
import "./Cart.css";


const useStyles = makeStyles(() => ({
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

export class Product{
    id: number;
    name: string;
    quantity: number;
    price: string;

    constructor(id: number, name: string, quantity: number, price: string) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }
}

export const Cart: React.FC = props => {
    const [products, setProducts] = React.useState([] as Product[]);
    const [loading, setLoading] = React.useState(true);
    const classes = useStyles();

    let history = useHistory();

    useEffect(() => {

        ProductService.getCartProducts().then((productsArr) => {
            console.log(productsArr);
            setProducts(productsArr);


            products.map( (product: Product) => {
                console.log("test" + product)
            });

            setLoading(false);

        })

    }, []);

    const handleBuyButton = () => {
        if (products.length === 0){
            console.log("Cart is empty, cannot buy");
        }
        else{
            console.log("Go ahead, buy");
            history.push("/buy")
        }
    }

    return loading ? (<div>ładowanie</div>)
        : (
            <Box
                display="flex"
                alignSelf="center"
                alignItems="center"
                flexDirection="column"
                justifyContent="center"
                style={{minHeight: "90vh"}}
            >
                <Typography variant="h3" className="titleStyle">
                    Twój Koszyk
                </Typography>


                <Card className={classes.paperStyle} variant="outlined">
                    <Box style={{minHeight: "18vh"}}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableRow>
                                    <TableCell>Nazwa produktu</TableCell>
                                    <TableCell>Ilość</TableCell>
                                    <TableCell>Cena</TableCell>
                                    <TableCell/>
                                    <TableCell/>
                                    <TableCell/>
                                </TableRow>

                                {
                                    products.map((product) => {
                                        return <RecordInCart {...product}/>;
                                    })
                                }
                            </Table>
                        </TableContainer>
                    </Box>

                    <div className="cart-buttons-div">
                        <Button
                            variant="outlined"
                            color="secondary"
                            size="small"
                            className="cart-decline-button"
                            component={Link}
                            to="/products"
                        >
                            Anuluj
                        </Button>
                        {products.length > 0 ?
                            <Button onClick={handleBuyButton}
                                    variant="contained"
                                    size="medium"
                                    className="cart-buy-button"
                            >
                                Kup
                            </Button>
                            :
                            <Button onClick={handleBuyButton}
                                    variant="contained"
                                    size="medium"
                                    color="primary"
                                    className="cart-buy-button"
                                    disabled
                            >
                                Kup
                            </Button>
                        }
                    </div>
                </Card>
            </Box>
        );

}