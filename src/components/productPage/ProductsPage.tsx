import React, { useEffect } from "react";
import "./ProductPage.css";
import ProductCard from "./ProductCard";
import ProductService from "../../services/ProductService";
import { CircularProgress } from "@material-ui/core";
import {useLocation} from "react-router-dom";

export class Product {
  categoryId: number;
  description: string;
  height: number;
  id: number;
  name: string;
  price: number;
  weight: number;
  width: number;

  constructor(
    categoryId = 1,
    description = "",
    height = 0,
    id = 0,
    name = "",
    price = 0,
    weight = 0,
    width = 0
  ) {
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
  const [products, setProducts] = React.useState<any>();

  const [loading, setLoading] = React.useState(true);

  let location = useLocation();

  useEffect(() => {
    ProductService.getProducts().then((response) => {
      setProducts(response);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const paramEmail = query.get("email");
    const paramAuth = query.get("authenticator");
    if (paramEmail) {
      document.cookie = `email=${paramEmail}; path=/`;
      document.cookie = `oAuth=true; path=/`;
      if (paramAuth != null) {
        document.cookie = `authenticator=${decodeURIComponent(
            paramAuth
        ).replaceAll(" ", "+")}; path=/`;
      }
      window.location.href = "/products";
    }

    console.log(paramAuth)
    console.log(paramEmail)
  }, []);

  return loading ? (
    <div className="spinner">
      <CircularProgress />
    </div>
  ) : (
    <div className="outer-div">
      <div className="card-div">
        {products.map((product: any) => {
          return <ProductCard {...product} />;
        })}
      </div>
    </div>
  );
}
