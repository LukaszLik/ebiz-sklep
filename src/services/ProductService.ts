import axios from "axios";
import {Product} from "../components/cart/Cart";

class ProductService {
    async getProducts() {
        return axios.get(`https://https://sklep-back2.azurewebsites.net/api/products`)
        .then(res => {
          return res.data;
        })
    }

    async getCartProducts(){
        let allCookies = document.cookie.split(";");
        let productsArr = [] as Product[];

        for (let cookie of allCookies){
            let id = cookie.split("=")[0]
            if (/[0-9]+/.test(id)){
                console.log("match = " + id)
                let vals = cookie.split("=")[1].split(",");

                productsArr.push(new Product(parseInt(id), vals[0],
                    parseInt(vals[1]), parseFloat(vals[2])));
            }
        }

        return productsArr;
    }

    async deleteProductsInCart(){
        let allCookies = document.cookie.split(";");

        for (let cookie of allCookies){
            let id = cookie.split("=")[0]
            if (/[0-9]+/.test(id)) {
                console.log("deleting");
                document.cookie = `${id}=deleted; path=/; expires=` + new Date(0).toUTCString();
            }
        }
    }

}
  
export default new ProductService();