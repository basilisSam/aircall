import {
  ArchiveFilled,
  AssignedOutlined,
  Box,
  CalendarOutlined,
  CallFilled,
  CallInboundFilled,
  CallOutboundFilled,
  ClockFilled,
  ContactsOutlined,
  NotesFilled,
  OverviewOutlined,
  Spacer,
  Typography,
  UserOutlined,
} from "@aircall/tractor";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CallNote from "../CallNote/CallNote";
import { getCallInfo } from "../../service/calls";
import Spinner from "../Spinner/Spinner";

const CallDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [callInfo, setCallInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const callDate = callInfo.created_at;
  const durationInHours = callInfo.duration / 3600;
  const durationInMinutes = callInfo.duration / 60;

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
  }, [callInfo]);

  const getCallCreatedTime = () =>
    callDate.substring(callDate.indexOf("T") + 1, callDate.indexOf("."));
  const getCallCreatedDate = () => callDate.split("T")[0];

  return (
    <>
      {!isLoading ? (
        <>
          <Box
            boxShadow={1}
            borderRadius={10}
            height='380px'
            width='350px'
            ml={3}
          >
            <Spacer space='m' direction='vertical' p={4} mb={20}>
              <Spacer space='s' direction='vertical'>
                <Typography variant='subheading2'>
                  <p>
                    <b>
                      <AssignedOutlined alignmentBaseline='central' /> From:{" "}
                    </b>
                    {callInfo.from}
                  </p>
                  <p>
                    <b>
                      <UserOutlined alignmentBaseline='central' /> To:{" "}
                    </b>
                    {callInfo.to}
                  </p>
                  <p>
                    <b>
                      {callInfo.direction === "inbound" ? (
                        <CallInboundFilled alignmentBaseline='central' />
                      ) : (
                        <CallOutboundFilled alignmentBaseline='central' />
                      )}{" "}
                      Direction:{" "}
                    </b>
                    {callInfo.direction}
                  </p>
                  <p>
                    <b>
                      <OverviewOutlined alignmentBaseline='central' /> Duration:{" "}
                    </b>
                    {durationInHours >= 1
                      ? `${durationInHours.toFixed(2)}h`
                      : `${durationInMinutes.toFixed(2)}m`}
                  </p>
                  <p>
                    <b>
                      <ContactsOutlined alignmentBaseline='central' /> Via:{" "}
                    </b>
                    {callInfo.via}
                  </p>
                  <p>
                    <b>
                      <CalendarOutlined alignmentBaseline='central' /> Date:{" "}
                    </b>
                    {getCallCreatedDate()}
                  </p>
                  <p>
                    <b>
                      <ClockFilled alignmentBaseline='central' /> Time:{" "}
                    </b>
                    {getCallCreatedTime()}
                  </p>
                  <p>
                    <b>
                      <CallFilled alignmentBaseline='central' /> Call type:{" "}
                    </b>
                    {callInfo.call_type}
                  </p>
                  <p>
                    <b>
                      <ArchiveFilled alignmentBaseline='central' /> Status:{" "}
                    </b>
                    {callInfo.is_archived ? "Archived" : "Not Archived"}
                  </p>
                </Typography>
              </Spacer>
            </Spacer>
            {callInfo.notes.length > 0 && (
              <Typography mb={2} textAlign={"left"} variant='subheading'>
                Notes <NotesFilled alignmentBaseline='central' />
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
          <Spinner />
        </Spacer>
      )}
    </>
  );
};

export default CallDetails;
