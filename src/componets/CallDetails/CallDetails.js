import {Box, Spacer, Typography} from "@aircall/tractor";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import CallNote from "../CallNote/CallNote";
import {getCallInfo} from "../../service/calls";

const CallDetails = () => {
    const navigate = useNavigate();
    const {id} = useParams();
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
                    <Box size='320px' bg='grey.lighter' position='relative'>
                        <Spacer space='m' direction='vertical' alignItems='start'>
                            <Spacer space='s' direction='vertical'>
                                <Typography variant='Heading 02'>
                                    From : {callInfo.from}
                                </Typography>
                                <Typography variant='Heading 02'>To: {callInfo.to}</Typography>
                                <Typography variant='Heading 02'>
                                    Direction: {callInfo.direction}
                                </Typography>
                                <Typography variant='Heading 02'>
                                    Duration: {callInfo.duration/3600}h
                                </Typography>
                                <Typography variant='Heading 02'>Via:{callInfo.via}</Typography>
                                <Typography variant='Heading 02'>
                                    Call Type: {callInfo.call_type}
                                </Typography>
                                <Typography variant='Heading 02'>
                                    Created At: {callInfo.created_at}
                                </Typography>
                            </Spacer>
                        </Spacer>

                        <Spacer space='s' direction='vertical' alignItems='center' pt={80}>
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
