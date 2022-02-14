import {
    Box,
    Button,
    Checkbox,
    Form,
    FormItem,
    Grid,
    TextFieldInput,
} from "@aircall/tractor";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {login} from "../service/login";

const Login = ({setIsLoggedIn}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("success");
    const [passwordError, setPasswordError] = useState("success");

    const navigate = useNavigate();

    const captureUsername = (e) => {
        setUsername(e.target.value);
    };
    const capturePassword = (e) => {
        setPassword(e.target.value);
    };

    const loginSubmit = () => {
        if (credentialsAreValid()) {
            login(username, password, navigate).then(() => {
                setIsLoggedIn(true);
            })
        }
    }

    const credentialsAreValid = () => {
        if (username !== "" && password !== "")
            return true;

        username === "" ? setUsernameError("error") : setUsernameError("success")
        password === "" ? setPasswordError("error") : setPasswordError("success")
    }

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
                    <FormItem label='Username' name='username'
                              validationStatus={usernameError}
                              helpText={usernameError === "error" ? "Username cannot be empty" : ""}>
                        <TextFieldInput
                            onChange={(e) => captureUsername(e)}
                            placeholder='Please type your username'
                            validationStatus={usernameError}
                        />
                    </FormItem>
                    <FormItem label='Password' name='password'
                              validationStatus={passwordError}
                              helpText={passwordError === "error" ? "Password cannot be empty" : ""}>
                        <TextFieldInput
                            onChange={(e) => capturePassword(e)}
                            type='password'
                            validationStatus={passwordError}
                            placeholder='Please type your password'
                        />
                    </FormItem>
                    <FormItem name='remember_me'>
                        <Checkbox>Remember me</Checkbox>
                    </FormItem>
                    <FormItem>
                        <Button
                            block
                            onClick={() => loginSubmit()}
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
