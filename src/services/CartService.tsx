import axios from "axios";

class CartService{
    async getCart(){
        return axios.get("https://sklep-back2.azurewebsites.net/api/cartItems");
        // return axios.get("https://localhost:9000/api/cartItems");

    }

    async addToCart(){
        axios.post("https://sklep-back2.azurewebsites.net/api/")
        // axios.post("https://localhost:9000/api/")

    }

    async buyProducts(userId: number, price: number){
        // /api/addOrder
        axios.post("https://sklep-back2.azurewebsites.net/api/addOrder", {
            userId, price
        });

        // axios.post("https://localhost:9000/api/addOrder", {
        //     userId, price
        // });
    }
}

export default new CartService();