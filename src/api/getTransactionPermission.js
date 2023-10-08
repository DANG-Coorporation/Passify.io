import server from "./apiSettings";

const getTransactionPermission = (userId, eventId) => {
  return server.get(`/transactions`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params: {
      user_id: userId,
      event_id: eventId,
    },
  });
};

export default getTransactionPermission;
