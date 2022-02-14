import { Typography } from "@aircall/tractor";
import Calls from "./Calls";
import PropTypes from "prop-types";
import Sidebar from "./Sidebar";

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

GroupByDateCalls.propTypes = {
  groupByDate: PropTypes.shape({
    date: PropTypes.string,
    calls: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string
        })),
  }),
  archiveCall: PropTypes.func.isRequired
}

export default GroupByDateCalls;
