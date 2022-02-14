import {Box, Spacer, Toggle, Typography} from "@aircall/tractor";
import PropTypes from "prop-types";
import GroupByDateCalls from "./GroupByDateCalls";

const Sidebar = ({ groupByDateToggle, groupCallsByDate,showArchivedToggle,showArchived }) => {
  return (
    <Spacer space='s'>
      <Box height='300px' width='200px' bg='grey.light' position='relative'>
        <Spacer space='s' alignItems='center' alignContent='center'>
          <Typography variant='body'>Group by date</Typography>
          <Toggle
            size='small'
            data-testid="groupByDateToggleId"
            checked={groupByDateToggle}
            onChange={() => groupCallsByDate()}
          />
        </Spacer>
          <Spacer space='s' alignItems='center' mt={10} alignContent='center'>
          <Typography variant='body'>Show archived</Typography>
          <Toggle
            size='small'
            checked={showArchivedToggle}
            onChange={() => showArchived()}
          />
        </Spacer>
      </Box>
    </Spacer>
  );
};

GroupByDateCalls.propTypes = {
  groupByDateToggle:PropTypes.bool,
  groupCallsByDate:PropTypes.func.isRequired,
  showArchivedToggle:PropTypes.bool,
  archiveCall: PropTypes.func.isRequired
}

export default Sidebar;
