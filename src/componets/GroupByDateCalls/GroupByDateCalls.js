import {Typography} from "@aircall/tractor";
import Calls from "../Calls/Calls";
import PropTypes from "prop-types";

const GroupByDateCalls = ({ groupByDate, updateCall }) => {
  return (
    <>
      {Object.keys(groupByDate).map((date) => (
        <div key={date}>
        <Typography mb="4px" textAlign="center" variant="heading">{date} </Typography>
          <Calls
              enablePagination={false}
            updateCall={updateCall}
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
  updateCall: PropTypes.func.isRequired
}

export default GroupByDateCalls;
