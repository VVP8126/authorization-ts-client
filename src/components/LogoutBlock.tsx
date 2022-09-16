import { FC, useContext } from "react";
import { Context } from "..";
import {observer} from "mobx-react-lite";

const LogoutBlock:FC = () => {

    const {store} = useContext(Context);

    const logoutHandler = () => {
        store.logout();
    }
    
    return (
        <div className="logoutBlock">
            <div className="logoutTopMenu">
                <div className="leftLabel">{ store.user && `User: ${store.user.email}` }</div>
                <div className="logoutBtn right" onClick={logoutHandler} >LOGOUT</div>
            </div>
            <div>
                { store.user.isActivated 
                    ? "Account activated" 
                    : "You should activate your email account"
                }
            </div>
        </div>
    );
}

export default observer(LogoutBlock);
