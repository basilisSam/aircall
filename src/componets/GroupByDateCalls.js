import { Typography } from "@aircall/tractor";
import Calls from "./Calls";

const GroupByDateCalls = ({ groupByDate, archiveCall }) => {
  return (
    <>
      {Object.keys(groupByDate).map((date) => (
        <div key={date}>
        <Typography mb="4px" textAlign="center" variant="heading2">{date} </Typography>
          <Calls
            archiveCall={archiveCall}
            calls={groupByDate[date]}
          />
        </div>
      ))}
    </>
  );
};

export default GroupByDateCalls;
