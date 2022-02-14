import {
  Avatar,
  Badge,
  Button,
  Flex,
  Spacer,
  Typography,
} from "@aircall/tractor";
import avatar from "@aircall/tractor/es/styles/avatar";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../service/login";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Flex
      bg='primary.light'
      color='base.white'
      alignItems='center'
      justifyContent='center'
      p={3}
    >
      <Link to="/">
        <Typography variant='displayS'>
            Aircall
            </Typography>
      </Link>
      <Spacer space='s' fluid justifyContent='flex-end'>
        <Badge size='small' variant='primary'>
          <Avatar size='small' src={avatar} />
        </Badge>
        <Button size='medium' variant='black' onClick={() => logout(navigate)}>
          Logout
        </Button>
      </Spacer>
    </Flex>
  );
};

export default Navbar;
