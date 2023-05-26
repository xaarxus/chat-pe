import React, { useState, useContext } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
  Heading,
} from '@chakra-ui/react';
import socket from '../socket';
import { FriendContext, FriendContextType } from './Home';


const AddFriendModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const { setFriends, friends } = useContext(FriendContext) as FriendContextType; 
  const [username, setUsername] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const findUser = () => {
    socket.emit('add_friend', username, ({ errorMsg, done, newFriend }: { errorMsg: string, done: boolean, newFriend: string }) => {
      if (done && newFriend) {
        setFriends([newFriend, ...friends])
        onClose();
        setErrorMsg('');
        return;
      }
      setErrorMsg(errorMsg);
    });
  }

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign='center' paddingLeft='10px'>Add a friend</ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>
          <Heading as='p' color='red.500' textAlign='center' fontSize='lg'>{errorMsg}</Heading>
          <form>
            <FormControl>
              <FormLabel fontSize='lg'>User's name</FormLabel>
              <Input
                placeholder="Enter user's name"
                autoComplete='off'
                size='lg'
                name='username'
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='green' onClick={findUser} type='submit'>Add</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddFriendModal;
