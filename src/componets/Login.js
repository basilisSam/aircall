import {
  Box,
  Button,
  Checkbox,
  Form,
  FormItem,
  Grid,
  TextFieldInput,
} from "@aircall/tractor";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../service/login";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const captureUsername = (e) => {
    setUsername(e.target.value);
  };
  const capturePassword = (e) => {
    setPassword(e.target.value);
  };

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
          <FormItem label='Username' name='username'>
            <TextFieldInput
              onChange={(e) => captureUsername(e)}
              placeholder='Please type your username'
            />
          </FormItem>
          <FormItem label='Password' name='password'>
            <TextFieldInput
              onChange={(e) => capturePassword(e)}
              type='password'
              placeholder='Please type your password'
            />
          </FormItem>
          <FormItem name='remember_me'>
            <Checkbox>Remember me</Checkbox>
          </FormItem>
          <FormItem>
            <Button
              block
              onClick={() => loginAction(username, password, navigate)}
            >
              Login
            </Button>
          </FormItem>
        </Grid>
      </Form>
    </Box>
  );
};

export default Login;
