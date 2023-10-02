import server from "./apiSettings";

const getEvent = () => {
  return server.get("/events", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export default getEvent;
