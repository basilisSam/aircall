import {
  Box,
  Button,
  Checkbox,
  Form,
  FormItem,
  Grid,
  Select,
  TextFieldInput,
} from "@aircall/tractor";
import { useState } from "react";
const Login = () => {
  return (
    <Box
      mx='auto'
      size='400px'
      position='absolute'
      left='0'
      right='0'
      top='150px'
      m='auto'
    >
      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Grid gridColumnGap={10} gridRowGap={10} gridTemplateColumns='1fr'>
          <FormItem
            label='Email'
            name='email'
            helpText='Your email should be unique'
          >
            <TextFieldInput
              placeholder='john.doe@example.com'
              defaultValue='jobs@aircall.io'
            />
          </FormItem>
          <FormItem
            label='Password'
            name='email'
            helpText='Password is too weak, try again!'
            validationStatus='error'
          >
            <TextFieldInput type='password' defaultValue='ThisIsAPassword!' />
          </FormItem>

          <FormItem name='remember_me'>
            <Checkbox>Remember me</Checkbox>
          </FormItem>
          <FormItem>
            <Button block>Login</Button>
          </FormItem>
        </Grid>
      </Form>
    </Box>
  );
};

export default Login;
