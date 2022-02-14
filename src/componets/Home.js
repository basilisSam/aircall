import { Flex, Grid, Spacer } from "@aircall/tractor";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CALLS_URL } from "../constants";
import { getAuthorization } from "../service/login";
import Calls from "./Calls";
import Sidebar from "./Sidebar";
import GroupByDateCalls from "./GroupByDateCalls";
import { toast } from "react-toastify";
import Pusher from 'pusher-js';

const Home = () => {
    const pusher = new Pusher("d44e3d910d38a928e0be", {
        cluster: "eu",
        authEndpoint: 'https://frontend-test-api.aircall.io/pusher/auth',
        auth: {
            headers: { Authorization: "Bearer " + sessionStorage.getItem("jwt") }
        }
    });
    const channel = pusher.subscribe("private-aircall");
    channel.bind("update-call", (archivedCall) => {
        setCalls(calls.filter((call) => call.id !== archivedCall.id));
        setArchiveCalls([...archiveCalls, archivedCall]);
    });

    const navigate = useNavigate();
    const [calls, setCalls] = useState({});
    const [archiveCalls, setArchiveCalls] = useState({});
    const [groupByDate, setGroupByDate] = useState({});
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
                toast.success("Call has been archived successfully!", {
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

    const updateGroupCallsByDate = () => {
        if (groupByDateToggle) {
            const groups = calls.reduce((groups, call) => {
                const date = call.created_at.split("T")[0];
                if (!groups[date]) {
                    groups[date] = [];
                }
                groups[date].push(call);
                return groups;
            }, {});
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
            />
            <Flex alignItems='center' justifyContent='center' p={3}>
                {!isLoading ? (
                    <Spacer space='s' direction='vertical' justifyItems='center'>
                        {groupByDateToggle ? (
                            <GroupByDateCalls
                                archiveCall={archiveCall}
                                groupByDate={groupByDate}
                            />
                        ) : (
                            <Calls archiveCall={archiveCall} calls={calls} />
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
