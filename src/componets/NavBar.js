import {
  Button,
  Flex,
  Spacer,
  Typography,
} from "@aircall/tractor";
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
      <Link style={{ color: "inherit", textDecoration: "inherit" }} to='/'>
        <Typography variant='displayS'>Aircall</Typography>
      </Link>
      <Spacer space='s' fluid justifyContent='flex-end'>
        <Button size="xSmall" variant="black" onClick={() => logout(navigate)}>
          <Typography variant='subheading' color='white'>
            Log out
          </Typography>
        </Button>
      </Spacer>
    </Flex>
  );
};

export default Navbar;
