const generateGroupsByDate = (calls) => {
    return calls.reduce((groups, call) => {
        const date = call.created_at.split("T")[0];
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(call);
        return groups;
    }, {});
}

const addCallIfNotArchived = (calls, callUpdated) => {
    return callUpdated.is_archived ?
        calls.filter((call) => call.id !== callUpdated.id) :
        [...calls, callUpdated];
}

const addCallIfArchived = (calls, callUpdated) => {
    return callUpdated.is_archived ?
        [...calls, callUpdated]:
        calls.filter((call) => call.id !== callUpdated.id)
}

export {generateGroupsByDate, addCallIfNotArchived,addCallIfArchived};
