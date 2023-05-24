import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export type AccountContextType = {
  user: { username: string; signIn: boolean | null };
  setUser: (user: { username: string; signIn: boolean | null }) => void;
};

export const AccountContext = createContext<AccountContextType>({
  user: { username: '', signIn: null },
  setUser: () => {}
});

const SERVER_URL = 'http://localhost:4000';

const UserContext = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ username: string; signIn: boolean | null }>({ username: '', signIn: null });

  useEffect(() => {
    fetch(api.signIn(SERVER_URL), {
      credentials: 'include',
    })
      .catch(err => {
        setUser({ username: '', signIn: false });
      })
      .then(res => {
        if (!res || !res.ok || res.status >= 400) {
          setUser({ username: '', signIn: false });
          return;
        }
        return res.json();
      })
      .then(data => {
        console.log(data);
        if (data) {
          setUser({ ...data });
          navigate('/home');
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AccountContext.Provider value={{ user, setUser }}>
      {children}
    </AccountContext.Provider>
  );
};

export default UserContext;
