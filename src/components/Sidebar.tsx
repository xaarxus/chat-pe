import React, { useContext } from 'react';
import { ChatIcon } from '@chakra-ui/icons';
import {
  Text,
  Button,
  Divider,
  HStack,
  Heading,
  Tab,
  TabList,
  VStack,
  Circle,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { FriendContext, FriendContextType } from './Home';
import AddFriendModal from './AddFiendModal';


const Sidebar = () => {
  const { friends } = useContext(FriendContext) as FriendContextType; 
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <VStack py='1.5rem'>
        <HStack justify='space-evenly' w='100%'>
          <Heading size='md'>Add friend</Heading>
          <Button onClick={onOpen}>
            <ChatIcon />
          </Button>
        </HStack>
        <Divider />
        <VStack as={TabList}>
          {friends.map(friend => (
            <HStack as={Tab}>
              <Circle bg={friend.connected ? 'green.700' : 'red.500'} size='10px' />
              <Text>{friend.username}</Text>
            </HStack>
          ))}
        </VStack>
      </VStack>
      {isOpen ? <AddFriendModal isOpen={isOpen} onClose={onClose} /> : null}
    </>
  );
};

export default Sidebar;
