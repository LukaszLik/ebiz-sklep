import axios from "axios";

class UserService{
    async getUserData(email: string){
        return axios.get(`http://localhost:9000/api/getUsert/${email}`);
    }
}

export default new UserService();