import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AccountContext, AccountContextType } from './AccountContext';


const useAuth = () => {
  const { user } = useContext(AccountContext) as AccountContextType;
  return user && user.signIn;
}

const PrivatePoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to='/' />;
}

export default PrivatePoutes;
