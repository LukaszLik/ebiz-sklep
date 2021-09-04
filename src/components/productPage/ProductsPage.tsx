import React, {useEffect} from "react";
import "./ProductPage.css";
import ProductCard from "./ProductCard";
import ProductService from "../../services/ProductService";
import {CircularProgress} from "@material-ui/core";

export class Product{
    categoryId: number;
    description: string;
    height: number;
    id: number;
    name: string;
    price: number;
    weight: number;
    width: number;

    constructor(categoryId = 1, description = "", height =0,
    id = 0, name = "", price = 0, weight = 0, width = 0) {
        this.categoryId = categoryId;
        this.description = description;
        this.height = height;
        this.id = id;
        this.name = name;
        this.price = price;
        this.weight = weight;
        this.width = width;
    }

}

export default function ProductsPage() {
    // const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    // const [products, setProducts] = React.useState({
    //     productsArray: [] as Product[]
    // })
    const [products, setProducts] = React.useState<any>();

    const [loading, setLoading] = React.useState(true);

    useEffect( () => {
        ProductService.getProducts().then( (response) => {
            setProducts(response);
            setLoading(false);
        })
    },[])

    return loading ? ( <div className="spinner"><CircularProgress /></div>) :
        (
            <div className="outer-div">
                <div className="card-div">
                    {
                    products.map((product: any) => {
                        return <ProductCard {...product}/>
                    })}
                </div>
            </div>
        )
        // <div>
        //     {   loading ? <div>ŁADOWANIE</div>
        //         :
        //         products.productsArray.map( (product) => {
        //             console.log(product)
        //             return <ProductCard/>
        //         })
        //     }
        // </div>
    // )
}

