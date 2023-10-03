import server from "./apiSettings";

const getDashboardDetail = (userId) => {
  return server.get(`/dashboard/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export default getDashboardDetail;
