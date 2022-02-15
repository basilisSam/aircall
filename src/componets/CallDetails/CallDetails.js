import { Box, Spacer, Typography } from "@aircall/tractor";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CallNote from "../CallNote/CallNote";
import { getCallInfo } from "../../service/calls";

const CallDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [callInfo, setCallInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCallInfo(id)
      .then((call) => {
        setCallInfo(call);
        setIsLoading(false);
      })
      .catch((e) => {
        if (e.status === 401) {
          navigate("/Login");
        }
      });
  });

  return (
    <>
      {!isLoading ? (
        <>
          <Box
            boxShadow={1}
            borderRadius={10}
            height='350px'
            width='350px'
            ml={3}
          >
            <Spacer space='m' direction='vertical' p={4} mb={20}>
              <Spacer space='s' direction='vertical'>
                <Typography variant='subheading2'>
                  <p>
                    <b>From: </b>
                    {callInfo.from}
                  </p>
                  <p>
                    <b>To: </b>
                    {callInfo.to}
                  </p>
                  <p>
                    <b>Direction: </b>
                    {callInfo.direction}
                  </p>
                  <p>
                    <b>Duration: </b>
                    {callInfo.duration / 3600}h
                  </p>
                  <p>
                    <b>Via: </b>
                    {callInfo.via}
                  </p>
                  <p>
                    <b>Created at: </b>
                    {callInfo.created_at}
                  </p>
                  <p>
                    <b>Call type: </b>
                    {callInfo.call_type}
                  </p>
                  <p>
                    <b>Status: </b>
                    {callInfo.is_archived ? "Archived" : "Not Archived"}
                  </p>
                </Typography>
              </Spacer>
            </Spacer>
            {callInfo.notes.length > 0 && (
              <Typography mb={2} textAlign={"left"} variant='subheading'>
                Notes
              </Typography>
            )}
            <Spacer space='s' direction='vertical' alignItems='center'>
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
