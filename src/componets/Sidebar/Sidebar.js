import { Box, Spacer, Toggle, Typography } from "@aircall/tractor";
import PropTypes from "prop-types";

const Sidebar = ({
  groupByDateToggle,
  groupCallsByDate,
  showArchivedToggle,
  showArchived,
}) => {
  return (
    <Box height='300px' width='200px' position='relative' pl={50} pt={15}>
      <Spacer space='s' alignItems='center' alignContent='center'>
        <Typography variant='body'>Group by date</Typography>
        <Toggle
          size='small'
          data-testid='groupByDateToggleId'
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
  );
};

Sidebar.propTypes = {
  groupByDateToggle: PropTypes.bool,
  groupCallsByDate: PropTypes.func.isRequired,
  showArchivedToggle: PropTypes.bool,
  showArchived: PropTypes.func.isRequired,
};

export default Sidebar;
