import { Box, Spacer, Typography } from "@aircall/tractor";
import PropTypes from 'prop-types'; // ES6

const CallNote = ({ note }) => {
  return (
    <Box
      boxShadow={1}
      borderRadius={20}

      height='80px'
      width='500px'
      mb='15px'
    >
     <Spacer space='m' direction='vertical' alignItems='center'>
      <Typography variant='subheading2' weight='medium'>
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

CallNote.propTypes = {
  note: PropTypes.shape({
    content: PropTypes.string,
    id: PropTypes.string
  })
}

export default CallNote;
