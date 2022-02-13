import { Flex, Grid } from "@aircall/tractor";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CALLS_URL } from "../constants";
import { getAuthorization } from "../service/login";
import Calls from "./Calls";
import Sidebar from "./Sidebar";

const Home = () => {
  const navigate = useNavigate();
  const [calls, setCalls] = useState({});
  const [archiveCalls, setArchiveCalls] = useState({});
  const [groupByDate, setGroupByDate] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [groupByDateToggle, setGroupByDateToggle] = useState(false);

  const archiveCall = (id) => {
    fetch(`${CALLS_URL}${id}/archive`, {
      method: "PUT",
      headers: getAuthorization(),
    })
      .then((r) => r.json())
      .then((archivedCall) => {
        setCalls(calls.filter((call) => call.id !== archivedCall.id));
        setArchiveCalls([...archiveCalls, archivedCall]);
      });
  };

  const groupCallsByDate = () => {
    setGroupByDateToggle(!!groupByDateToggle);

    const groups = calls.reduce((groups, call) => {
      const date = call.created_at.split("T")[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(call);
      return groups;
    }, {});

    setGroupByDate(groups);
    console.log(groups);
  };

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
        setCalls(calls.nodes.filter((call) => call.is_archived === false));
        setArchiveCalls(
          calls.nodes.filter((call) => call.is_archived === true)
        );
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
      <Sidebar
        groupByDateToggle={groupByDateToggle}
        groupCallsByDate={groupCallsByDate}
      />
      <Flex alignItems='center' justifyContent='center' p={3}>
        {isLoggedIn && !isLoading ? (
          <Calls archiveCall={archiveCall} calls={calls} />
        ) : (
          <span className='loader' />
        )}
      </Flex>
    </Grid>
  );
};

export default Home;
