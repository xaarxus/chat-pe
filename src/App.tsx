import React from 'react';
import ToggleColorModeBtn from './components/ToggleColorModeBtn';
import Views from './components/Views';
import UserContext from './components/AccountContext';
import socket from './socket';

const App = () => {
  socket.connect();

  return (
    <UserContext>
      <Views />
      <ToggleColorModeBtn />
    </UserContext>
  );
}

export default App;
