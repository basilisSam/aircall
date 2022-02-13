import {
  Avatar,
  Box,
  Flex,
  IconButton,
  InformationOutlined,
  UserOutlined,
} from "@aircall/tractor";
import { Link } from "react-router-dom";

const Call = ({ call }) => {
  const showCallInfo = () => {
    console.log("redirect");
  };
  return (
    <Box boxShadow={1} borderRadius={100} height='80px' width='500px'>
      <Flex justifyContent='center' alignItems='flex-end'>
        <Avatar size='large' icon={<UserOutlined />} />
        {call.from}
        <Link to={`/calls/${call.id}`}>
          <IconButton
            size={32}
            component={InformationOutlined}
            color='primary.base'
          />
        </Link>
      </Flex>
    </Box>
  );
};

export default Call;
