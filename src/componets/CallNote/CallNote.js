import { Box, Spacer, Typography } from "@aircall/tractor";
import PropTypes from "prop-types";

const CallNote = ({ note }) => {
  return (
    <Box boxShadow={1} borderRadius={10} height='80px' width='500px'>
      <Spacer space='m' direction='vertical'>
        <Typography p={2} textAlign={"left"}>
          {note.content}
        </Typography>
      </Spacer>
    </Box>
  );
};

CallNote.propTypes = {
  note: PropTypes.shape({
    content: PropTypes.string,
    id: PropTypes.string,
  }),
};

export default CallNote;
