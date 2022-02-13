import { Box, Spacer, Toggle, Typography } from "@aircall/tractor";

const Sidebar = ({ groupByDateToggle, groupCallsByDate }) => {
  return (
    <Spacer space='s'>
      <Box height='300px' width='200px' bg='grey.light' position='relative'>
        <Spacer space='s' alignItems='center' alignContent='center'>
          <Typography variant='body'>Group by date</Typography>
          <Toggle
            size='small'
            checked={groupByDateToggle}
            onChange={groupCallsByDate}
          />
        </Spacer>
      </Box>
    </Spacer>
  );
};

export default Sidebar;
