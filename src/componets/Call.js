import {
  ArchiveOutlined,
  Avatar,
  Box,
  Flex,
  IconButton,
  InformationOutlined,
  UserOutlined,
} from "@aircall/tractor";
import { Link } from "react-router-dom";

const Call = ({ call, archiveCall }) => {
  return (
    <Box boxShadow={1} borderRadius={100} height='80px' width='500px'>
      <Flex justifyContent='center' alignItems='flex-end'>
        <Avatar size='large' icon={<UserOutlined />} />
        {call.from}
        {call.created_at}
        <Link to={`/calls/${call.id}`}>
          <IconButton
            size={32}
            component={InformationOutlined}
            color='primary.base'
          />
        </Link>
        <IconButton
          onClick={() => archiveCall(call.id)}
          size={32}
          component={ArchiveOutlined}
          color='red.base'
        />
      </Flex>
    </Box>
  );
};

export default Call;