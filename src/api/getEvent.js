import server from "./apiSettings";

const getEvent = () => {
  return server.get("/events");
};

export default getEvent;
