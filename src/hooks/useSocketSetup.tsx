import { useEffect, useContext } from 'react';
import { AccountContext, AccountContextType } from '../components/AccountContext';
import socket from '../socket';


const useSocketSetup = (friends: any[], setFriends: (friend: any) => void) => {
  const { setUser } = useContext(AccountContext) as AccountContextType;

  useEffect(() => {
    socket.connect();

    socket.on('friends', (friendList) => {
      setFriends(friendList);
    });

    socket.on('connected', (status: boolean, username: string) => {
      setFriends(friends.map(friend => {
        if (username === friend.username) {
          return { ...friend, connected: status };
        }
        return { ...friend };
      }));
    });

    socket.on('connect_error', () => {
      setUser({ username: '', signIn: false });
    });

    return () => {
      socket.off('connect_error');
    };
  }, [setUser, setFriends, friends]);
}

export default useSocketSetup;
