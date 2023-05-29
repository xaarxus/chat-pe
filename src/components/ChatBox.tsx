import React, { useContext } from 'react'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup';
import { Button, HStack, Input } from '@chakra-ui/react';
import socket from '../socket';
import {
  MessageContext,
  MessageContextType
} from './Home';


const ChatBox = ({ userid }: { userid: string }) => {
  const { messages, setMessages } = useContext(MessageContext) as MessageContextType;

  return (
    <Formik
      initialValues={{ message: '' }}
      validationSchema={yup.object({
        message: yup.string().min(1).max(250),
      })}
      onSubmit={(values, actions) => {
        const message = { from: null, to: userid, content: values.message }
        socket.emit('dm', message);
        setMessages([message, ...messages])
        actions.resetForm();
      }}
    >
      <HStack as={Form} w='100%' pb='1.5rem' px='1.5rem'>
        <Input as={Field} name='message' placeholder='Type message' size='lg' autoComplete='off' />
        <Button type='submit' size='lg' colorScheme='teal'>Send</Button>
      </HStack>
    </Formik>
  )
}

export default ChatBox
