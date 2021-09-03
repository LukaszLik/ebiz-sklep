import axios from "axios";

class CartService{
    async getCart(){
        return axios.get("https://sklep-back2.azurewebsites.net/api/cartItems");
    }

    async addToCart(){
        axios.post("https://sklep-back2.azurewebsites.net/api/")
    }

    async buyProducts(userId: number, price: number){
        // /api/addOrder
        axios.post("https://sklep-back2.azurewebsites.net/api/addOrder", {
            userId, price
        });
    }
}

export default new CartService();