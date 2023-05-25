import React, { useState } from 'react';
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
} from '@chakra-ui/react';


const AddFriendModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [username, setUsername] = useState('');

  const findUser = () => {
    console.log(username)
    onClose();
    setUsername('');
  }

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign='center' paddingLeft='10px'>Add a friend</ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>
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
