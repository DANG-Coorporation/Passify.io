import server from "./apiSettings";

const getEventByUserId = (userId = 0, association = false) => {
  return server.get(`/user-events`, {
    params: {
      user_id: userId,
      association,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export default getEventByUserId;
