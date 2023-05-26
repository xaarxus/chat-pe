import { useEffect, useContext } from 'react';
import { AccountContext, AccountContextType } from '../components/AccountContext';
import socket from '../socket';


const useSocketSetup = (setFriends: (friend: any) => void) => {
  const { setUser } = useContext(AccountContext) as AccountContextType;

  useEffect(() => {
    socket.connect();

    socket.on('friends', (friendList) => {
      setFriends(friendList);
    });

    socket.on('connect_error', () => {
      setUser({ username: '', signIn: false });
    });

    return () => {
      socket.off('connect_error');
    };
  }, [setUser]);
}

export default useSocketSetup;
