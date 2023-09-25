import server from "./apiSettings";

const postLogin = (data) => {
  return server.post("/login", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default postLogin;
