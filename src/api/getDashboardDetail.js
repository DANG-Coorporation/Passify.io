import server from "./apiSettings";

export const getDashboardDetail = (userId) => {
  return server.get(`/dashboard/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getTransactionDashboard = (event_id = 0) => {
  return server.get(`/dashboard/event-details`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params: {
      event_id: event_id,
    },
  });
};
