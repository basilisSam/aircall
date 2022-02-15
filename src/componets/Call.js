import {
  ArchiveOutlined,
  Box,
  CallFilled,
  Flex,
  IconButton,
  InformationOutlined,
  Spacer,
  Typography,
} from "@aircall/tractor";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Call = ({ call, updateCall }) => {
  return (
    <Box
      boxShadow={1}
      borderRadius={100}
      height='80px'
      width='350px'
      mb='15px'
      display={"flex"}
    >
      <Flex justifyContent='center' alignItems='center'>
        <Spacer
          space='s'
          pr={30}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography variant='heading'>From:</Typography>
          <Typography textAlign='right'> {call.from} </Typography>
        </Spacer>
        <Link to={`/calls/${call.id}`}>
          <IconButton
            size={32}
            component={InformationOutlined}
            color='primary.base'
          />
        </Link>
        <IconButton
          onClick={() => updateCall(call.id)}
          size={32}
          component={ArchiveOutlined}
          color='red.base'
        />
      </Flex>
    </Box>
  );
};

Call.propTypes = {
  call: PropTypes.shape({
    from: PropTypes.string,
    created_at: PropTypes.string,
    id: PropTypes.string,
  }),
  updateCall: PropTypes.func.isRequired,
};

export default Call;
