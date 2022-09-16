import {FC, useState} from "react";
import { IUser } from "../models/IUser";
import UserService from "../services/UserService";

const UserList: FC = () => {

    const [users, setUsers] = useState<IUser[]>([]);
    
    const clickHandler = async () => {
        try {
            const responce = await UserService.fetchUsers();
            setUsers(responce.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div onClick={clickHandler} className="btn centered">Load user list</div>
            <div className="margined container">
                {users.map(user => <div key={user.id}>{user.email}</div>)}
            </div>
        </div>
    );
}
export default UserList;
