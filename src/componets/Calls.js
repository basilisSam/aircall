import Call from "./Call";

const Calls = ({ calls }) => {
  return (
    <>
      {calls.map((call) => (
        <Call key={call.id} call={call} />
      ))}
    </>
  );
};

export default Calls;
