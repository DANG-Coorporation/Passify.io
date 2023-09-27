import server from "./apiSettings";

export const postSignup = (data = {}) => {
  return server.post("/signup", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
