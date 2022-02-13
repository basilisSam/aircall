import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthorization } from "../service/login";
import Calls from "./Calls";
import { CALLS_URL } from "../constants";
import { Flex, Grid } from "@aircall/tractor";

const Home = () => {
  const navigate = useNavigate();
  const [calls, setCalls] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(CALLS_URL, {
      headers: getAuthorization(),
    })
      .then((calls) => {
        if (calls.ok) {
          return calls.json();
        }
        throw calls;
      })
      .then((calls) => {
        setCalls(calls.nodes);
        setIsLoggedIn(true);
        setIsLoading(false);
      })
      .catch((e) => {
        if (e.status === 401) {
          navigate("/login");
        }
      });
  }, []);

  return (
    <Grid gridTemplateColumns='max-content auto' gridGap={2}>
      <Flex />
      <Flex alignItems='center' justifyContent='center' p={3}>
        {isLoggedIn && !isLoading ? (
          <Calls calls={calls} />
        ) : (
          <span className='loader' />
        )}
      </Flex>
    </Grid>
  );
};

export default Home;
