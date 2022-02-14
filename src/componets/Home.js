import { Flex, Grid, Spacer } from "@aircall/tractor";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CALLS_URL } from "../constants";
import { getAuthorization } from "../service/login";
import Calls from "./Calls";
import Sidebar from "./Sidebar";
import GroupByDateCalls from "./GroupByDateCalls";
import { toast } from "react-toastify";
import Pusher from "pusher-js";
import {
  addCallIfArchived,
  addCallIfNotArchived,
  generateGroupsByDate,
} from "../service/calls";

const Home = () => {
  const pusher = new Pusher("d44e3d910d38a928e0be", {
    cluster: "eu",
    authEndpoint: "https://frontend-test-api.aircall.io/pusher/auth",
    auth: {
      headers: { Authorization: "Bearer " + sessionStorage.getItem("jwt") },
    },
  });
  const channel = pusher.subscribe("private-aircall");
  channel.bind("update-call", (archivedCall) => {
    // setCalls(calls.filter((call) => call.id !== archivedCall.id));
    // setArchiveCalls([...archiveCalls, archivedCall]);
  });

  const navigate = useNavigate();
  const [calls, setCalls] = useState({});
  const [archiveCalls, setArchiveCalls] = useState({});
  const [groupByDate, setGroupByDate] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [groupByDateToggle, setGroupByDateToggle] = useState(false);
  const [archivedToggle, setArchivedToggle] = useState(false);

  const updateCall = (id) => {
    fetch(`${CALLS_URL}${id}/archive`, {
      method: "PUT",
      headers: getAuthorization(),
    })
      .then((r) => r.json())
      .then((archivedCall) => {
        setCalls(addCallIfNotArchived(calls, archivedCall));
        setArchiveCalls(addCallIfArchived(archiveCalls, archivedCall));
        toast.success("Call has been updated successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
        });
      });
  };

  const groupCallsByDate = () => {
    setGroupByDateToggle(!groupByDateToggle);
  };

  const showArchived = () => {
    setArchivedToggle(!archivedToggle);
  };

  const updateGroupCallsByDate = () => {
    if (groupByDateToggle) {
      const groups = generateGroupsByDate(calls);
      setGroupByDate(groups);
    }
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
        setIsLoading(false);
      })
      .catch((e) => {
        if (e.status === 401) {
          navigate("/login");
        }
      });

    updateGroupCallsByDate();
  }, [groupByDateToggle]);

  return (
    <Grid gridTemplateColumns='max-content auto' gridGap={3}>
      <Sidebar
        groupByDateToggle={groupByDateToggle}
        groupCallsByDate={groupCallsByDate}
        archivedToggle={archivedToggle}
        showArchived={showArchived}
      />
      <Flex alignItems='center' justifyContent='center' p={3}>
        {!isLoading ? (
          <Spacer space='s' direction='vertical' justifyItems='center'>
            {groupByDateToggle ? (
              <GroupByDateCalls
                updateCall={updateCall}
                groupByDate={groupByDate}
              />
            ) : (
              <Calls
                enablePagination={true}
                updateCall={updateCall}
                calls={calls}
                itemsPerPage={2}
              />
            )}

            {archivedToggle && (
              <>
                <h1>Archived</h1>
                <Calls
                  enablePagination={false}
                  updateCall={updateCall}
                  calls={archiveCalls}
                  itemsPerPage={2}
                />
              </>
            )}
          </Spacer>
        ) : (
          <span className='loader' />
        )}
      </Flex>
    </Grid>
  );
};

export default Home;
