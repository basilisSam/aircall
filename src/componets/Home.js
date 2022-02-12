import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthorization } from "../service/login";
import Calls from "./Calls";

const Home = () => {
  const navigate = useNavigate();
  const [calls, setCalls] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const URL = "https://frontend-test-api.aircall.io/calls";

  useEffect(() => {
    fetch(URL, {
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
      })
      .catch((e) => {
        if (e.status == 401) {
          navigate("/login");
        }
      });
  });

  return <>{isLoggedIn ? <Calls calls={calls} /> : <p> Hello </p>}</>;
};

export default Home;
