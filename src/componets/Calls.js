import Call from "./Call";
import PropTypes from "prop-types";

const Calls = ({ calls, archiveCall }) => {
  return (
      <>
      {calls.map((call) => (
        <Call  archiveCall={archiveCall} key={call.id} call={call} />
      ))}
    </>
  );
};

Calls.propTypes = {
  calls: PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string
  })),
  archiveCall: PropTypes.func.isRequired
}

export default Calls;
