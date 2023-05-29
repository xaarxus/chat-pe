import React, { useContext, useRef, useEffect } from 'react';
import { TabPanel, TabPanels, VStack, Text } from '@chakra-ui/react';
import {
  FriendContext,
  FriendContextType,
  MessageContext,
  MessageContextType
} from './Home';
import ChatBox from './ChatBox';


const Chat = ({ friend }: { friend: any }) => {
  const { friends } = useContext(FriendContext) as FriendContextType;
  const { messages } = useContext(MessageContext) as MessageContextType;
  const bottomDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomDiv.current) {
      bottomDiv.current.scrollIntoView();
    }
  });


  return friends.length > 0 ? (
    <VStack h='90%' justify='end' mt='9%'>
      <TabPanels overflowY='scroll'>
        {friends.map((friend) => {
          return (
            <VStack flexDir='column-reverse' as={TabPanel} key={`chat:${friend.username}`} w='100%'>
              <div ref={bottomDiv} />
              {messages
                .filter(msg => msg.to === friend.userid || msg.from === friend.userid)
                .map((msg, i) => (
                  <Text
                    m={msg.to === friend.userid ? '10px 0 0 auto !important' : '10px auto 0 0 !important'}
                    key={`msg:${friend.username}:${i}`}
                    fontSize='lg'
                    bg={msg.to === friend.userid ? 'green.200' : 'gray.200'}
                    color='gray.800'
                    borderRadius='10px'
                    p='5px 10px'
                    maxW='70%'
                  >
                    {msg.content}
                  </Text>
                ))
              }
            </VStack>
          );
        })}
      </TabPanels>
      <ChatBox userid={friend.userid} />
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
