import server from "./apiSettings";

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};
export const getOrderList = async (user_id = 0, params) => {
  const response = await server.get(
    `/order-list/${user_id}`,
    {
      params: params,
      headers: config.headers
    }
  );
  return response.data;
};
