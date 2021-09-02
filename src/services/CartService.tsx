import axios from "axios";

class CartService{
    async getCart(){
        return axios.get("http://localhost:9000/api/cartItems");
    }

    async addToCart(){
        axios.post("http://localhost:9000/api/")
    }

    async buyProducts(userId: number, price: number){
        // /api/addOrder
        axios.post("http://localhost:9000/api/addOrder", {
            userId, price
        });
    }
}

export default new CartService();