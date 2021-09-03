import axios from "axios";

class LoginService{
    async signIn(email :string, password: string) {
        return axios
            .post("https://https://sklep-back2.azurewebsites.net/api/signIn", {
                email,
                password,
            })
            .then((response) => {
                document.cookie = `role=${response.data.role}; path=/`;
                document.cookie = `email=${response.data.email}; path=/`;
            });
    }

    async signUp(email :string, firstName :string, lastName :string, password :string) {
        return axios.post("https://https://sklep-back2.azurewebsites.net/api/signUp", {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
        });
    }

    isLogged(){
        if (document.cookie.split("; ").find((row) => row.startsWith("email="))) {
            // @ts-ignore
            return document.cookie
                .split("; ")
                .find((row) => row.startsWith("email="))
                .split("=")[1];
        }
        return "";
    }
//    Qwerty!1 a@a.com
//    Qwerty1! xD
}

export default new LoginService();