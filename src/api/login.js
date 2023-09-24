import server from "./apiSettings";

const postLogin = (data) => {
  return server.post("/login", data);
};
