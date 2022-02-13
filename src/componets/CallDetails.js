import { Box, Spacer, Typography } from "@aircall/tractor";
import { Accordion } from "@aircall/tractor/es/components/Accordion/Accordion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CALLS_URL } from "../constants";
import { getAuthorization } from "../service/login";
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
  }, []);

  return (
    <>
      {!isLoading ? (
        <>
          <Box
            size='150px'
            width='500px'
            bg='primary.lighter'
            position='relative'
          >
            <Spacer space='m' direction='vertical' alignItems='start'>
              <Spacer space='s' direction='vertical'>
                <Typography variant='body'>
                  From : {callInfo.from}
                  Direction: {callInfo.direction}
                  To: {callInfo.to}
                  Duration: {callInfo.duration}
                  Archive:{callInfo.is_archive}
                  Call Type: {callInfo.call_type}
                  Via: {callInfo.via}
                  Created At: {callInfo.created_at}
                </Typography>
              </Spacer>
            </Spacer>
          </Box>

          <Spacer space='s' direction='vertical' justifyItems='center'>
            {callInfo.notes.map((note) => (
              <CallNote key={note.id} note={note} />
            ))}
          </Spacer>
        </>
      ) : (
        <span className='loader' />
      )}
    </>
  );
};

export default CallDetails;
