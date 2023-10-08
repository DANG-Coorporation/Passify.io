import server from "./apiSettings";

const postTransaction = (data) => {
  return server.post("/transactions", data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export default postTransaction;
