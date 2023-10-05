import server from "./apiSettings";

const getEventTransactionByUserId = (userId = 0) => {
  return server.get(`/transactions/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};


export default getEventTransactionByUserId;
