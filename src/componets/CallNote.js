import { Box, Spacer, Typography } from "@aircall/tractor";
import PropTypes from "prop-types"; // ES6

const CallNote = ({ note }) => {
  return (
    <Box boxShadow={1} borderRadius={10} height='80px' width='500px'>
      <Spacer space='m' direction='vertical'>
        <Typography variant='subheading2' weight='medium' alignSelf={"center"}>
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
