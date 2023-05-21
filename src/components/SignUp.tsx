import React from 'react';
import { ArrowLeftIcon } from "@chakra-ui/icons";
import {
  VStack,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Heading,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';

const SignUp = () => {
  const navigate = useNavigate();

  const formik = useFormik<{ username: string; password: string }>({
    initialValues: { username: '', password: '' },
    validationSchema: Yup.object({
      username: Yup
        .string()
        .required('Username required')
        .min(5, 'Username to short')
        .max(20, 'Username to long'),
      password: Yup
        .string()
        .required('Password required')
        .min(5, 'Password to short')
        .max(20, 'Password to long'),
    }),
    onSubmit: (values, actions) => {
        alert(JSON.stringify(values, null, 2));
        actions.resetForm();
    }
  });

  const goBack = () => {
    navigate('/');
  };

  return (
    <VStack
      as='form'
      w={{ base: '90%',  md: '500px', }}
      m='auto'
      justify='center'
      h='100vh'
      spacing='1rem'
      onSubmit={formik.handleSubmit as React.FormEventHandler<HTMLElement>}
    >
      <Heading>Sign Up</Heading>

      <FormControl isInvalid={!!formik.errors.username && formik.touched.username}>
        <FormLabel fontSize='lg'>Username</FormLabel>
        <Input
          placeholder='Enter username'
          autoComplete='off'
          size='lg'
          {...formik.getFieldProps('username')}
        />
        <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!formik.errors.password && formik.touched.password}>
        <FormLabel fontSize='lg'>Password</FormLabel>
        <Input
          type='password'
          placeholder='Enter password'
          autoComplete='off'
          size='lg'
          {...formik.getFieldProps('password')}
        />
        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
      </FormControl>

      <ButtonGroup pt='1rem'>
        <Button colorScheme='teal' type='submit'>Sign Up</Button>
        <Button onClick={() => goBack()} leftIcon={<ArrowLeftIcon />}>Back</Button>
      </ButtonGroup>
    </VStack>
  );
}

export default SignUp;
