import { fetchWrapper } from "../api/fetchApi";
import { CALLS_URL } from "../constants";

const generateGroupsByDate = (calls) => {
  return calls.reduce((groups, call) => {
    const date = call.created_at.split("T")[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(call);
    return groups;
  }, {});
};

const updateCalls = (calls, callUpdated) => {
  return callUpdated.is_archived
    ? calls.filter((call) => call.id !== callUpdated.id)
    : [...calls, callUpdated];
};

const updateArchivedCalls = (archivedCalls, callUpdated) => {
  return callUpdated.is_archived
    ? [...archivedCalls, callUpdated]
    : archivedCalls.filter((call) => call.id !== callUpdated.id);
};

const updateCall = (id) => {
  return fetchWrapper({ endpoint: `${CALLS_URL}${id}/archive`, method: "PUT" });
};

const getAllCalls = () => {
  return fetchWrapper({ endpoint: CALLS_URL });
};

const getCallInfo = (id) => {
  return fetchWrapper({ endpoint: CALLS_URL + id });
};

export {
  generateGroupsByDate,
  updateCalls,
  updateArchivedCalls,
  updateCall,
  getAllCalls,
  getCallInfo,
};
