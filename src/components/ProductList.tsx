import React from "react";
import ProductService from "../services/ProductService";
import Product from "./Product";
import "./ProductList.css";

interface State {}
interface Props {}

export class ProductList extends React.Component<Props, State> {
    state = {
        productList: []
    }

    async componentDidMount() {
        const productList = await ProductService.getProducts();
        this.setState({productList})
    }

    render() {
    return (
        <div className="card-area">
            <div className="card-container">
                { this.state.productList.map((product, index) => <Product key={index} product={product}/>)}
            </div>
        </div>
    )
    }
}