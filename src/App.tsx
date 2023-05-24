import React from 'react';
import ToggleColorModeBtn from './components/ToggleColorModeBtn';
import Views from './components/Views';
import UserContext from './components/AccountContext';

const App = () => {
  return (
    <UserContext>
      <Views />
      <ToggleColorModeBtn />
    </UserContext>
  );
}

export default App;
