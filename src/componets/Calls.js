import Call from "./Call";
import { Spacer } from "@aircall/tractor";
import PropTypes from "prop-types";
import CallNote from "./CallNote";

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
