import axios from "axios";

class UserService{
    async getUserData(email: string){
        return axios.get(`https://https://sklep-back2.azurewebsites.net/api/getUsert/${email}`);
    }
}

export default new UserService();