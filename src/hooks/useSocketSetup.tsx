import { useEffect, useContext } from 'react';
import { AccountContext, AccountContextType } from '../components/AccountContext';
import socket from '../socket';


const useSocketSetup = () => {
  const { setUser } = useContext(AccountContext) as AccountContextType;

  useEffect(() => {
    socket.connect();
    socket.on('connect_error', () => {
      setUser({ username: '', signIn: false });
    });

    return () => {
      socket.off('connect_error');
    };
  }, [setUser]);
}

export default useSocketSetup;
