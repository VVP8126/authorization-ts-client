import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponce } from "../models/AuthResponce";

export default class AuthService {
    
    static async login(email:string, password: string): Promise<AxiosResponse<AuthResponce>> {
        return $api.post<AuthResponce>("/login", {email, password});
    }
    
    static async register(email:string, password: string): Promise<AxiosResponse<AuthResponce>> {
        return $api.post<AuthResponce>("/register", {email, password});
    }
    
    static async logout(): Promise<void> {
        return $api.post("/logout");
    }
}
