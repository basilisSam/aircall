import Call from "./Call";
import {Spacer} from "@aircall/tractor";

const Calls = ({ calls }) => {
  return (
      <Spacer space="s" direction="vertical" justifyItems="center">
        {calls.map((call) => (
            <Call key={call.id} call={call} />
        ))}
      </Spacer>

  );
};

export default Calls;
