import React, {useContext, useEffect} from 'react';
import './styles/styles.css';
import LoginForm from './components/LoginForm';
import {observer} from "mobx-react-lite";
import { Context } from '.';
import LogoutBlock from './components/LogoutBlock';
import UserList from './components/UserList';

function App() {
  
  const {store} = useContext(Context);
  
  useEffect(
    () => {
      if(localStorage.getItem("token")) {
        store.checkAuthorization();
      }
    },
    []
  );
  
  if(store.isLoading) {
    return <div className='spinner'></div>
  }

  return (
    <div>
      { store.isAuthorized 
          ? <div>
              <LogoutBlock />
              <UserList/>
            </div> 
          : <LoginForm /> 
      }
    </div>
  );
}

export default observer(App);
