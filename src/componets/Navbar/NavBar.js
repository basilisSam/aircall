import { Button, Flex, Spacer, Typography } from "@aircall/tractor";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../service/login";
import PropTypes from "prop-types";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const logoutSubmit = () => {
    logout(navigate);
    setIsLoggedIn(false);
  };

  return (
    <Flex
      bg='primary.light'
      color='base.white'
      alignItems='center'
      justifyContent='flex-start'
      p={3}
    >
      <Link style={{ color: "inherit", textDecoration: "inherit" }} to='/'>
        <Typography variant='displayS'>Aircall</Typography>
      </Link>
      {isLoggedIn && (
        <Spacer space='s' fluid justifyContent='flex-end'>
          <Button size='xSmall' variant='black' onClick={() => logoutSubmit()}>
            <Typography variant='subheading' color='white'>
              Logout
            </Typography>
          </Button>
        </Spacer>
      )}
    </Flex>
  );
};

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool,
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default Navbar;
