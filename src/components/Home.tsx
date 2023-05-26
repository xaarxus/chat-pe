import React, { createContext, useState } from 'react';
import { Grid, GridItem, Tabs } from '@chakra-ui/react';
import useSocketSetup from '../hooks/useSocketSetup';
import Sidebar from './Sidebar';
import Chat from './Chat';


export type FriendContextType = {
  friends: any[];
  setFriends: (friend: any) => void;
};

export const FriendContext = createContext<FriendContextType>({
  friends: [],
  setFriends: () => {}
});

const Home = () => {
  const [friends, setFriends] = useState([]);
  useSocketSetup(setFriends);

  return (
    <FriendContext.Provider value={{ friends, setFriends }}>
      <Grid as={Tabs} templateColumns='repeat(10, 1fr)' h='100vh'>
        <GridItem colSpan={3} borderRight='1px solid gray'>
          <Sidebar />
        </GridItem>
        <GridItem colSpan={7}>
          <Chat />
        </GridItem>
      </Grid>
    </FriendContext.Provider>
  );
};

export default Home;
