import { Flex, Grid, Spacer, Typography } from "@aircall/tractor";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthorizationToken } from "../../service/login";
import Calls from "../Calls/Calls";
import Sidebar from "../Sidebar/Sidebar";
import GroupByDateCalls from "../GroupByDateCalls/GroupByDateCalls";
import { toast } from "react-toastify";
import Pusher from "pusher-js";
import {
  generateGroupsByDate,
  getAllCalls,
  updateArchivedCalls,
  updateCall,
  updateCalls,
} from "../../service/calls";
import {
  APP_KEY,
  AUTH_ENDPOINT,
  CHANNEL_NAME,
  CLUSTER,
  EVENT_NAME,
  TOAST_DEFAULT_CONFIG,
} from "../../constants";
import Spinner from "../Spinner/Spinner";

const Home = () => {
  const pusher = new Pusher(APP_KEY, {
    cluster: CLUSTER,
    authEndpoint: AUTH_ENDPOINT,
    auth: { headers: { Authorization: getAuthorizationToken() } },
  });

  const PAGE_SIZE = 3;
  const navigate = useNavigate();

  const [calls, setCalls] = useState({});
  const [archiveCalls, setArchiveCalls] = useState({});
  const [groupByDate, setGroupByDate] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [groupByDateToggle, setGroupByDateToggle] = useState(false);
  const [archivedToggle, setArchivedToggle] = useState(false);

  useEffect(() => {
    const channel = pusher.subscribe(CHANNEL_NAME);
    channel.bind(EVENT_NAME, (archivedCall) => {
      // For some reason calls are not updated when an event happens
    });

    getAllCalls()
      .then((calls) => {
        setCalls(calls.nodes.filter((call) => call.is_archived === false));
        setArchiveCalls(
          calls.nodes.filter((call) => call.is_archived === true)
        );
        setIsLoading(false);
      })
      .catch((e) => {
        if (e.status === 401) {
          navigate("/Login");
        }
      });

    updateGroupCallsByDate();

    return () => {
      channel.unbind(EVENT_NAME);
      pusher.unsubscribe(CHANNEL_NAME);
    };
  }, [groupByDateToggle]);

  const handleUpdateCall = (id) => {
    updateCall(id).then((updatedCall) => {
      setCalls(updateCalls(calls, updatedCall));
      setArchiveCalls(updateArchivedCalls(archiveCalls, updatedCall));
      toast.success(
        "Call has been updated successfully!",
        TOAST_DEFAULT_CONFIG
      );
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

  const renderArchivedIfEnabled = () => {
    return (
      <>
        {archivedToggle && (
          <>
            <Typography mb={2} variant='displayS' textAlign={"center"}>
              Archived
            </Typography>
            <Calls
              enablePagination={false}
              updateCall={handleUpdateCall}
              calls={archiveCalls}
              itemsPerPage={2}
            />
          </>
        )}
      </>
    );
  };

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
                updateCall={handleUpdateCall}
                groupByDate={groupByDate}
              />
            ) : (
              <Calls
                enablePagination={true}
                updateCall={handleUpdateCall}
                calls={calls}
                itemsPerPage={PAGE_SIZE}
              />
            )}

            {renderArchivedIfEnabled()}
          </Spacer>
        ) : (
          <Spinner />
        )}
      </Flex>
    </Grid>
  );
};

export default Home;
