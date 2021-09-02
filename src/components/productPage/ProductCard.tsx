import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import "../Product.css"
import {Box} from "@material-ui/core";


export default function ProductCard(props: any){


    const handleAddToCart = () => {
        // items= id, name, quantity, price; id, name, quantity, price

        let allCookies = document.cookie.split(";");
        for (let cookie of allCookies){
            let id = cookie.split("=")[0]
            let vals = cookie.split("=")[1].split(",");

            let numberOfProducts = parseInt(vals[1]) + 1;

            if (id == props.id){
                document.cookie = `${props.id}=${props.name}, ${numberOfProducts}, ${props.price}; path=/`
            }
            else{
                document.cookie = `${props.id}=${props.name}, 1, ${props.price}; path=/`
            }
        }

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
        </Card>
    )
}