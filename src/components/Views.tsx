import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  Text,
} from '@chakra-ui/react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import PrivatePoutes from './PrivatePoutes';
import { AccountContext, AccountContextType } from './AccountContext';

const Views = () => {
  const { user } = useContext(AccountContext) as AccountContextType;

  return user.signIn === null
    ? <Text>Loading...</Text>
    : (
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route element={<PrivatePoutes />}>
          <Route path="/home" element={<Text>Home</Text>} />
        </Route>
        <Route path="*" element={<SignIn />} />
      </Routes>
    );
}

export default Views;
