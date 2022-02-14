import {Box, Spacer, Typography} from "@aircall/tractor";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {CALLS_URL} from "../constants";
import {getAuthorization} from "../service/login";
import CallNote from "./CallNote";

const CallDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [callInfo, setCallInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(CALLS_URL + id, {
      headers: getAuthorization(),
    })
      .then((call) => {
        if (call.ok) {
          return call.json();
        }
        throw call;
      })
      .then((call) => {
        setCallInfo(call);
        setIsLoading(false);
      })
      .catch((e) => {
        if (e.status === 401) {
          navigate("/login");
        }
      });
  });

  return (
    <>
      {!isLoading ? (
        <>
          <Box size="320px" bg='grey.lighter' position='relative'>
            <Spacer space='m' direction='vertical' alignItems='start'>
              <Spacer space='s' direction='vertical'>
                <Typography variant='body'>
                  <h3>From : {callInfo.from}</h3>
                  <h3>To: {callInfo.to}</h3>
                  <h3>Direction: {callInfo.direction}</h3>
                  <h3>Duration: {callInfo.duration}</h3>
                  <h3>Archive:{callInfo.is_archive}</h3>
                  <h3>Via:{callInfo.via}</h3>
                  <h3>Call Type: {callInfo.call_type}</h3>
                  <h3>Created At: {callInfo.created_at}</h3>
                </Typography>
              </Spacer>
            </Spacer>
          
         
          <Spacer space='s' direction='vertical' alignItems='start' mt={40}>
            {callInfo.notes.map((note) => (
              <CallNote key={note.id} note={note} />
            ))}
          </Spacer>
          </Box>
        </>
      ) : (
        <Spacer space='m' direction='vertical' alignItems='center'>
        <span className='loader' />
        </Spacer>
      )}
    </>
  );
};

export default CallDetails;
