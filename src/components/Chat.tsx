import React, { useContext } from 'react';
import { TabPanel, TabPanels, VStack, Text } from '@chakra-ui/react';
import { FriendContext, FriendContextType } from './Home';


const Chat = () => {
  const { friends } = useContext(FriendContext) as FriendContextType; 

  return friends.length > 0 ? (
    <VStack>
      <TabPanels>
        <TabPanel>Friend 1</TabPanel>
        <TabPanel>Friend 2</TabPanel>
      </TabPanels>
    </VStack>
  )
  : (
    <VStack textAlign='center' pt='5rem' fontSize='lg'>
      <TabPanels>
        <TabPanel>
          <Text size='md'>No friends</Text>
        </TabPanel>
      </TabPanels>
    </VStack>
  );
};

export default Chat;
