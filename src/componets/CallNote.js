import PropTypes from 'prop-types'; // ES6

const CallNote = ({ note }) => {
  return <div>{note.content}</div>;
};

CallNote.propTypes = {
  note: PropTypes.shape({
    content: PropTypes.string,
    id: PropTypes.string
  })
}

export default CallNote;
