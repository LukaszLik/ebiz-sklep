import React from "react";
import "./App.css";
import {Route, Switch} from "react-router-dom";
import {Nav} from "./components/Nav";
import ProductsPage from "./components/productPage/ProductsPage";
import OrderPage from "./components/OrderPage";
import LoginComponent from "./components/LoginComponent";
import {Cart} from "./components/cart/Cart";
import Product from "./components/Product"
// @ts-ignore
import RegisterComponent from "./components/register/RegisterComponent.tsx";
import BuyComponent from "./components/buy/BuyComponent";

export const App: React.FC = props => {

    return (
        <div className="App">
            <Nav/>
            <Switch>
                {/*<Route path="/" exact component={MainPage}/>*/}
                {/*<Route path="/product/:id" exact component={ProductPage}/>*/}
                <Route path="/products" exact component={ProductsPage}/>
                <Route path="/cart" exact component={Cart}/>
                <Route path="/order-page" exact component={OrderPage}/>
                <Route path="/login" exact component={LoginComponent}/>
                <Route path="/product" exact component={Product} />
                <Route path="/register" exact component={RegisterComponent}/>
                <Route path="/buy" exact component={BuyComponent}/>
            </Switch>
        </div>
    );

}

export default App;
