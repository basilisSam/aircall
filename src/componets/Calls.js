import Call from "./Call";
import { Spacer } from "@aircall/tractor";

const Calls = ({ calls, archiveCall }) => {
  return (
      <>
      {calls.map((call) => (
        <Call  archiveCall={archiveCall} key={call.id} call={call} />
      ))}
    </>
  );
};

export default Calls;
