import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/";

class UserService{
    getAllUsers(){
        return axios.get(API_URL + "user", { headers: authHeader() });
    }

    
}

export default new UserService();