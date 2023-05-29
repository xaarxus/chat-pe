import React, { createContext, useState } from 'react';
import { Grid, GridItem, Tabs } from '@chakra-ui/react';
import useSocketSetup from '../hooks/useSocketSetup';
import Sidebar from './Sidebar';
import Chat from './Chat';

export type FriendContextType = {
  friends: any[];
  setFriends: (friends: any) => void;
};
export type MessageContextType = {
  messages: any[];
  setMessages: (messages: any) => void;
};
export const FriendContext = createContext<FriendContextType>({
  friends: [],
  setFriends: () => {}
});
export const MessageContext = createContext<MessageContextType>({
  messages: [],
  setMessages: () => {}
});


const Home = () => {
  const [friends, setFriends] = useState([]);
  const [messages, setMessages] = useState([]);
  const [friendIndex, setFriendIndex] = useState(0);

  useSocketSetup(friends, setFriends, messages, setMessages);

  return (
    <FriendContext.Provider value={{ friends, setFriends }}>
      <Grid
        as={Tabs}
        templateColumns='repeat(10, 1fr)'
        h='100vh'
        onChange={index => setFriendIndex(Number(index))}
        >
        <GridItem colSpan={3} borderRight='1px solid gray'>
          <Sidebar />
        </GridItem>
        <GridItem colSpan={7} maxH='100vh'>
          <MessageContext.Provider value={{ messages, setMessages }}>
            <Chat friend={friends[friendIndex]} />
          </MessageContext.Provider>
        </GridItem>
      </Grid>
    </FriendContext.Provider>
  );
};

export default Home;
