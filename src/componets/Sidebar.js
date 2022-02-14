import { Box, Spacer, Toggle, Typography } from "@aircall/tractor";
import PropTypes from "prop-types";

const Sidebar = ({ groupByDateToggle, groupCallsByDate }) => {
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
      </Box>
    </Spacer>
  );
};

export default Sidebar;
