import server from "./apiSettings";

const getEventById = (eventId = 0) => {
  return server.get(`/events/${eventId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export default getEventById;
