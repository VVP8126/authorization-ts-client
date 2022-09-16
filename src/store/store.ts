import { IUser } from "./../models/IUser";
import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import { AuthResponce } from "../models/AuthResponce";
import { API_URL } from "../http";

export default class Store {
    
    user = {} as IUser;
    isAuthorized = false;
    loginError = "";
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }
    setAuthorized(flag: boolean) {
        this.isAuthorized = flag;
    }
    setUser(user: IUser) {
        this.user = user;
    }
    setLoginError(err: string) {
        this.loginError = err;
    }
    setLoading(flag: boolean) {
        this.isLoading = flag;
    }

    async login(email:string, password:string) {
        try {
            const responce = await AuthService.login(email, password);
            localStorage.setItem("token", responce.data.accessToken);
            this.setAuthorized(true);
            this.setUser(responce.data.userDTO);
            this.setLoginError("");
            console.log("USER: " + JSON.stringify(this.user));    
        } catch (error:any) {
            console.log(error);
            this.setLoginError(error.response?.data?.message);
            console.log("Login error message: " + this.loginError);
        }
    }

    async register(email:string, password:string) {
        try {
            const responce = await AuthService.register(email, password);
            localStorage.setItem("token", responce.data.accessToken);
            this.setAuthorized(true);
            this.setUser(responce.data.userDTO);
        } catch (error:any) {
            console.log("Registration error message: " + JSON.stringify(error.responce?.data?.message));
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem("token");
            this.setAuthorized(false);
            this.setUser({} as IUser);
        } catch (error:any) {
            console.log("Logout error message: " + JSON.stringify(error.responce?.data?.message));
        }
    }
    
    async checkAuthorization() {
        this.setLoading(true);
        this.setAuthorized(false);
        try {
            const responce = 
                await axios.get<AuthResponce>(
                    `${API_URL}/refresh`,
                    {withCredentials:true}
                );
            console.log(responce);
            localStorage.setItem("token", responce.data.accessToken);
            this.setAuthorized(true);
            this.setUser(responce.data.userDTO);
        } catch (error:any) {
            console.log("Refresh error message: " + JSON.stringify(error.responce?.data?.message));
        }
        finally {
            this.setLoading(false);
        }
    }
}
