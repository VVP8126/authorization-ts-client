import React from "react";
import { FC, useState, useContext } from "react";
import {Context} from "./../index";
import {observer} from "mobx-react-lite";

const LoginForm:FC = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const {store} = useContext(Context);

    const loginHandler = () => {
        store.login(email, password);
    }

    const registerHandler = () => {
        alert(`Registration with email: ${email}, password: ${password}`);
        store.register(email, password);
    }

    return (
        <div className="form">
            <h2 className="headerH2">LOGIN</h2>
            <div className="inputBlock">
                <label className="label" htmlFor="userEmail">EMAIL</label>
                <input className="input" id="userEmail" type="text" placeholder="Enter email..." onChange={e => setEmail(e.target.value)} value={email} />
            </div>
            <div className="inputBlock">
                <label className="label" htmlFor="userPassword">PASSWORD</label>
                <input className="input" id="userPassword" type="password" placeholder="Enter password..." onChange={e => setPassword(e.target.value)} value={password} />
            </div>
            {store.loginError && <p>{store.loginError}</p>}
            <div className="btnArea">
                <button className="btn left whiteBackground" onClick={registerHandler}>
                    REGISTER
                </button>
                <button className="btn right" onClick={loginHandler}>
                    LOGIN
                </button>
            </div>
        </div>
    );
}

export default observer(LoginForm);
